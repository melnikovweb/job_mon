<?php
/*
Block Name: Result
Description: result block
Category: custom-blocks
Icon: admin-appearance
Keywords: result block
PostTypes: page
Mode: edit
Align: full
SupportsAlign: left center right wide full
SupportsAnchor: true
SupportsCustomClassName: true
SupportsMode: true
SupportsMultiple: true
SupportsReusable: true
SupportsJSX: false
Example: {"preview_image_help": "/blocks/result/preview.png"}
*/

if (isset($block['data']['preview_image_help'])) :
	echo '<img src="' . get_template_directory_uri() . $block['data']['preview_image_help'] . '" style="width:100%; height:auto;">';
	return;
endif;

$fields = get_fields();
$context = Timber::context();
$context['filter_nonce'] = wp_create_nonce('filter_nonce');
$post_type = 'documents';
$arrResponse = array();
$typology_tax = 'documents_typology_tax';
$years_tax = 'doc_year';
$period_tax = 'document_period_tax';
$category_tax = 'document_cat';
$type_tax = 'document_type';


$topology = get_categories(array(
	'taxonomy' => $typology_tax,
	'hide_empty' => false
));

$type = get_categories(array(
	'taxonomy' => $type_tax,
	'hide_empty' => false
));

$years = get_categories(array(
	'taxonomy' => $years_tax,
	'orderby' => 'name',
	'order' => 'DESC',
	'hide_empty' => false,
));

$period = get_categories(array(
	'taxonomy' => $period_tax,
	'hide_empty' => false
));


$category = get_categories(array(
	'taxonomy' => $category_tax,
	'hide_empty' => false,
));


foreach ($topology as $cat) {
	if ($cat->term_id === 107 || $cat->term_id === 69) {
		$args = array(
			'post_type' => $post_type,
			'posts_per_page' => 9999,
			'post_status' => array('publish'),
			'tax_query' => array(
				'relation' => 'AND',
				array(
					'taxonomy' => $typology_tax,
					'field' => 'id',
					'terms' => array($cat->term_id)
				),
				array(
					'taxonomy' => $type_tax,
					'field' => 'slug',
					'terms' => $type[0]->slug,
				)
			),
		);
	} else {
		$args = array(
			'post_type' => $post_type,
			'posts_per_page' => 9999,
			'post_status' => array('publish'),
			'tax_query' => array(
				'relation' => 'AND',
				array(
					'taxonomy' => $typology_tax,
					'field' => 'id',
					'terms' => array($cat->term_id)
				),
			),
		);
	}
	$response = new WP_Query($args);
	if ($response->post_count === 0) return;
	$posts = [];
	if ($response->have_posts()):
		while ($response->have_posts()): $response->the_post();
			$currentPostId = get_the_id();
			$fields = get_fields($currentPostId);
			$lang = apply_filters('wpml_current_language', null);

			$posts[] = [
				'id' => $currentPostId,
				'content' => (bool)wp_trim_words(apply_filters('the_content', get_the_content())),
				'date' => $lang === 'bg' ? get_the_date('d/m/Y') : get_the_date('d.m.Y'),
				'title' => get_the_title($currentPostId),
				'category' => taxonomy_exists($category_tax) && isset(get_the_terms($currentPostId, $category_tax)[0]) ? get_the_terms($currentPostId, $category_tax)[0]->name : '',
				'fields' => $fields,
				'permalink' => get_permalink($currentPostId),
				'filesize' => validate_field($fields, 'documents') && validate_field($fields['documents'][0], 'document') ? size_format(filesize(get_attached_file($fields['documents'][0]['document']['id'])), 2) : '',
				'year' => taxonomy_exists($years_tax) && isset(get_the_terms($currentPostId, $years_tax)[0]) ? get_the_terms($currentPostId, $years_tax)[0]->name : get_the_date('Y'),
				'period' => taxonomy_exists($period_tax) && isset(get_the_terms($currentPostId, $period_tax)[0]) ? get_the_terms($currentPostId, $period_tax)[0]->name : '',
			];
		endwhile;
	endif;
	wp_reset_postdata();

	foreach ($years as $year) {
		foreach ($period as $p) {
			foreach ($posts as $post) {
				if ($year->name === $post['year'] && $p->name === $post['period']) {
						$arrResponse[$cat->name][$year->name][$p->name][] = $post;
				}
			}
		}
	}
}


$context['typology_cats'] = $topology;
$context['type'] = $type;
$context['category'] = $category;
$context['class'] = 'result';
$context['posts'] = $arrResponse;
$context['classes'] = 'gutenberg-block';
$context['block'] = !empty($block) ? $block : null;
$context['block_classes'] = $block['className'] ?? null;

Timber::render('result/result.twig', $context);
