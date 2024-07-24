<?php
/**
 * The Template for displaying all single-documents posts
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 *
 *
 * Libraries: jquery
 */

$context           = Timber::context();
$timber_post       = Timber::get_post();
$context['post']   = $timber_post;
$context['fields'] = get_fields();
$context['post_date']   = get_the_date("m/d/Y");
$context['section_title'] = apply_filters('wpml_current_language', null) === 'bg' ? __( 'Приложения: ', 'monbat' ) : __( 'Attached file: ', 'monbat' );
Timber::render('single-documents.twig', $context);
