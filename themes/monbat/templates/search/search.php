<?php
/**
 * search results page
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 * 
 * Libraries: jquery
 */
global $paged;
$context          = Timber::context();
$context['s'] = get_search_query();
$context['title'] =  get_search_query();

$context['posts'] = new Timber\PostQuery(array(
	'post_status' => 'publish',
	'orderby'     => 'publish_date',
	'order'       => 'DESC',
	'paged'       => $paged,
	's' => get_search_query()
));

Timber::render('search.twig', $context);
