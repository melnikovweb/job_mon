<?php
/**
 * Template Name: Archive News Template
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

 $news = get_posts([
     'posts_per_page' => 9999,
     'post_type'      => 'news',
     'suppress_filters' => 0,
     'tax_query'        => [
         [
             'taxonomy' => 'news_type',
             'field'    => 'slug',
             'terms'    => apply_filters('wpml_current_language', null) === 'bg' ? 'news-bg' : 'news',
         ]
     ]
 ]);

 $news_arr = [];
 $tabs_arr = [];
 $cat_arr  = [];

 foreach ($news as $post) {
	 setup_postdata($post);
     $news_arr[] = [
        'url' => get_permalink($post->ID),
        'post_title'        => $post->post_title,
        'post_date'         => get_the_date('d/m/Y', $post->ID),
        'post_month'        => get_the_date('F', $post->ID),
        'post_categories'   => get_the_category($post->ID)[0]->name,
        'post_year'         => get_the_date('Y', $post->ID)
    ];
    $tabs_arr[] = get_the_date('Y', $post->ID);
    $cat_arr[] = get_the_category($post->ID)[0]->name;
 }

 wp_reset_postdata();

$context['tabs_arr'] = array_unique($tabs_arr);
$context['cat_arr'] = array_unique($cat_arr);
$context['news_arr'] = $news_arr;
$context['page_title'] = get_the_title(get_the_ID());

Timber::render('page-news.twig', $context);
