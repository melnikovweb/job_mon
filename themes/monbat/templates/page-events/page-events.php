<?php
/**
 * Template Name: Archive Events Template
 *
 * Methods for TimberHelper can be found in the /functions sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 *
 * Libraries: jquery
 */

$context = Timber::context();

$events = get_posts([
	'posts_per_page' => 9999,
	'post_type' => 'news',
	'suppress_filters' => 0,
	'tax_query' => [
		[
			'taxonomy' => 'news_type',
			'field' => 'slug',
			'terms' => apply_filters('wpml_current_language', null) === 'bg' ? 'events-bg' : 'events',
		]
	]
]);

$events_arr = [];
$tabs_arr = [];

foreach ($events as $post) {
	setup_postdata($post);
	$events_arr[] = [
		'url' => get_permalink($post->ID),
		'post_title' => $post->post_title,
		'post_date' => get_the_date('d/m/Y', $post->ID),
		'post_month' => get_the_date('F', $post->ID),
		'post_year' => get_the_date('Y', $post->ID)
	];
	$tabs_arr[] = get_the_date('Y', $post->ID);

}
$tabs_arr = array_unique($tabs_arr);

wp_reset_postdata();

$context['events_arr'] = $events_arr;
$context['tabs_arr'] = $tabs_arr;
$context['page_title'] = get_the_title(get_the_ID());

Timber::render('page-events.twig', $context);
