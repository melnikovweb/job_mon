<?php
// Ajax handler for filter
if (wp_doing_ajax()) {
	add_action('wp_ajax_filter_posts', 'filter_posts_ajax_handler');
	add_action('wp_ajax_nopriv_filter_posts', 'filter_posts_ajax_handler');
}
function filter_posts_ajax_handler()
{

	if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'filter_nonce')) {
		wp_send_json_error('Invalid nonce.');
	}
	$s = $_POST['search'];
	$category_data = isset($_POST['category']) && $_POST['category'] !== 'all' ? $_POST['category'] : '';
	$type_data = isset($_POST['type']) && $_POST['type'] !== '' ? $_POST['type'] : '';
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
		'order'   => 'DESC',
		'hide_empty' => false,
	));

	$period = get_categories(array(
		'taxonomy' => $period_tax,
		'hide_empty' => false
	));

	if ($category_data) {
		$category_data = array(
			'taxonomy' => $category_tax,
			'field' => 'slug',
			'terms' => $category_data
		);
	}


	foreach ($topology as $cat) {
		if ($cat->term_id === 107 || $cat->term_id === 69) {
			$args = array(
				'post_type' => $post_type,
				'posts_per_page' => 9999,
				'post_status' => array('publish'),
				'search_title' => $s,
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
						'terms' => $type_data ? $type_data : $type[0]->slug,
					),
					$category_data,
				),
			);
		} else {
			$args = array(
				'post_type' => $post_type,
				'posts_per_page' => 9999,
				'post_status' => array('publish'),
				'search_title' => $s,
				'tax_query' => array(
					'relation' => 'AND',
					array(
						'taxonomy' => $typology_tax,
						'field' => 'id',
						'terms' => array($cat->term_id)
					),
					$category_data,
				),
			);


		}
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
					'permalink'=> get_permalink($currentPostId),
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

	$context['posts'] = $arrResponse;
	$templates = array("parts/components/result-documents.twig");
	Timber::render($templates, $context);

	wp_die();
}

if (wp_doing_ajax()) {
	add_action('wp_ajax_filter_posts_agm', 'filter_posts_agm_ajax_handler');
	add_action('wp_ajax_nopriv_filter_posts_agm', 'filter_posts_agm_ajax_handler');
}
function filter_posts_agm_ajax_handler()
{

	if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'filter_nonce')) {
		wp_send_json_error('Invalid nonce.');
	}

	$type_data = isset($_POST['type']) && $_POST['type'] !== '' ? $_POST['type'] : '';
	$post_type = 'document_agm';
	$arrResponse = array();
	$category_tax = 'document_agm_cat';
	$type_tax = 'document_agm_type';
	$category_data = [];


	if ($type_data) {
		$category_data = array(
			'taxonomy' => $type_tax,
			'field' => 'slug',
			'terms' => $type_data
		);
	}

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
			$category_data
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
	$context['posts'] = $arrResponse;
	$templates = array("parts/components/agm-documents.twig");
	Timber::render($templates, $context);

	wp_die();
}
