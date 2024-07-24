<?php
/*
Block Name: News
Description: news block
Category: custom-blocks
Icon: admin-appearance
Keywords: news block
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
Example: {"preview_image_help": "/blocks/news/preview.png"}
*/

if (isset($block['data']['preview_image_help'])) :
	echo '<img src="' . get_template_directory_uri() . $block['data']['preview_image_help'] . '" style="width:100%; height:auto;">';
	return;
endif;

$fields = get_fields();
$context = Timber::context();
$cat = [];

if(validate_field($fields, 'category')) {
	$cat = array(
		'taxonomy' => 'category',
		'field' => 'id',
		'terms' => array($fields['category'])
	);
}

$news = get_posts(array(
	'posts_per_page' => 9999,
	'post_type'      => 'news',
	'suppress_filters' => 0,
	'tax_query'        => array(
		'relation' => 'AND',
		array(
			'taxonomy' => 'news_type',
			'field'    => 'slug',
			'terms'    => 'news',
		),
		$cat,
	)
));

$news_arr = [];
$tabs_arr = [];
$cat_arr  = [];

foreach ($news as $post) {
	$news_arr[] = [
		'url' => get_permalink($post->ID),
		'post_title'        => $post->post_title,
		'post_date'         => get_the_date('d/m/Y', $post->ID),
		'post_month'        => get_the_date('F', $post->ID),
		'post_categories'   => get_the_category($post->ID)[0]->name,
		'post_year'         => get_the_date('Y', $post->ID)
	];
	array_push($tabs_arr, get_the_date('Y', $post->ID));
	array_push($cat_arr, get_the_category($post->ID)[0]->name);
}

$context['tabs_arr'] = array_unique($tabs_arr);
$context['cat_arr'] = array_unique($cat_arr);
$context['news_arr'] = $news_arr;

$context['class'] = 'news';
$context['classes'] = 'gutenberg-block';
$context['block'] = !empty($block) ? $block : null;
$context['block_classes'] = $block['className'] ?? null;

Timber::render('news/news.twig', $context);
