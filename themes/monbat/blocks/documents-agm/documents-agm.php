<?php
/*
Block Name: Documents AGM
Description: documents agm block
Category: custom-blocks
Icon: admin-appearance
Keywords: documents agm block
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
Example: {"preview_image_help": "/blocks/documents-agm/preview.png"}
*/

if (isset($block['data']['preview_image_help'])) :
	echo '<img src="' . get_template_directory_uri() . $block['data']['preview_image_help'] . '" style="width:100%; height:auto;">';
	return;
endif;

$fields = get_fields();
$context = Timber::context();
$context['filter_nonce'] = wp_create_nonce('filter_nonce');
$post_type = 'document_agm';
$arrResponse = array();
$category_tax = 'document_agm_cat';
$type_tax = 'document_agm_type';


$category = get_categories(array(
	'taxonomy' => $category_tax,
	'hide_empty' => false
));

$type = get_categories(array(
	'taxonomy' => $type_tax,
	'hide_empty' => false
));

$args = array(
	'post_type' => $post_type,
	'posts_per_page' => 9999,
	'post_status' => array('publish'),
	'tax_query' => array(
		'relation' => 'AND',
		array(
			'taxonomy' => $type_tax,
			'field' => 'id',
			'terms' => array($type[0]->term_id)
		),
	),
);
$response = new WP_Query($args);

$posts = [];


if ($response->have_posts()):
	while ($response->have_posts()): $response->the_post();
		$currentPostId = get_the_id();
		$fields = get_fields($currentPostId);
		$lang = apply_filters('wpml_current_language', null);

		$posts[] = [
			'id' => $currentPostId,
			'content' => (bool)wp_trim_words(apply_filters( 'the_content', get_the_content())),
			'date' => $lang === 'bg' ? get_the_date('d/m/Y') : get_the_date('d.m.Y'),
			'title' => get_the_title($currentPostId),
			'category' => taxonomy_exists($category_tax) && isset(get_the_terms($currentPostId, $category_tax)[0]) ? get_the_terms($currentPostId, $category_tax)[0]->name : '',
			'fields' => $fields,
			'permalink' => get_permalink($currentPostId),
			'filesize' => validate_field($fields, 'documents') && validate_field($fields['documents'][0], 'document') ? size_format(filesize(get_attached_file($fields['documents'][0]['document']['id'])), 2) : '',
			'year' => get_the_date('Y'),
		];
	endwhile;
endif;
wp_reset_postdata();

$years = [];

foreach ($posts as $post) {
	$years[] = $post['year'];
}

$years = array_unique($years);

usort($years, function ($a, $b) {
	return strtotime($b) - strtotime($a);
});


foreach ($years as $year) {
	foreach ($category as $cat) {
		foreach ($posts as $post) {
			if ($year === $post['year'] && $cat->name === $post['category']) {
				$arrResponse[$year][$cat->name][] = $post;
			}
		}
	}
}


$context['type'] = $type;
$context['class'] = 'documents-agm';
$context['posts'] = $arrResponse;
$context['classes'] = 'gutenberg-block';
$context['block'] = !empty($block) ? $block : null;
$context['block_classes'] = $block['className'] ?? null;

Timber::render('documents-agm/documents-agm.twig', $context);
