<?php

add_theme_support('menus');
add_theme_support('post-thumbnails');
add_theme_support( 'title-tag');

// Custom Header
add_theme_support(
	'custom-header',
	array(
		'height' => '30',
		'flex-height' => true,
		'uploads' => true,
		'header-text' => false,
	)
);


// ACF Options Pages
add_action('acf/init', 'acf_op_init');
function acf_op_init()
{
	// Check function exists.
	if (function_exists('acf_add_options_page')) {
		acf_add_options_page(array(
			'menu_title' => 'Theme Options',
			'menu_slug' => 'theme-general-settings',
			'capability' => 'edit_posts',
			'redirect' => true,
		));
	}
}


// New Image sizes

add_image_size('social_icon', 20 , 17, false);
add_image_size('benefits', 135 , 135, false);


/**
 * Display taxonomy selection as dropdown
 *
 * @param WP_Post $post
 * @param array $box
 */
function custom_taxonomy_select_meta_box($post, $box)
{
	$defaults = array('taxonomy' => 'category');

	if (!isset($box['args']) || !is_array($box['args'])) return;

	$args = $box['args'];
	extract(wp_parse_args($args, $defaults), EXTR_SKIP);
	$tax = get_taxonomy($taxonomy);
	$selected = wp_get_object_terms($post->ID, $taxonomy, array('fields' => 'ids'));
	$hierarchical = $tax->hierarchical;
	?>
	<div id="taxonomy-<?php echo $taxonomy; ?>" class="selectdiv">
		<?php
		if (current_user_can($tax->cap->edit_terms)):
			if ($hierarchical):
				wp_dropdown_categories(array(
					'taxonomy' => $taxonomy,
					'class' => 'widefat',
					'hide_empty' => 0,
					'name' => "tax_input[$taxonomy][]",
					'selected' => count($selected) >= 1 ? $selected[0] : '',
					'orderby' => 'name',
					'hierarchical' => 1,
					'show_option_all' => '',
					'show_option_none'=>'N/A',
				));
			else: ?>
				<select name="<?php echo "tax_input[$taxonomy][]"; ?>" class="widefat">
					<option value="0">N/A</option>
					<?php foreach (get_terms($taxonomy, array('hide_empty' => false)) as $term): ?>
						<option value="<?php echo esc_attr($term->slug); ?>" <?php echo selected($term->term_id, count($selected) >= 1 ? $selected[0] : ''); ?>><?php echo esc_html($term->name); ?></option>
					<?php endforeach; ?>
				</select>
				<?php
			endif;
		endif; ?>
	</div>
	<?php
}



/*
 * Search posts by title
 */

add_filter( 'posts_where', 'search_posts_by_title', 10, 2 );
function search_posts_by_title( $where, $wp_query )
{
	global $wpdb;
	if ( $title = $wp_query->get( 'search_title' ) ) {
		$where .= " AND " . $wpdb->posts . '.post_title LIKE \'%' . esc_sql( $wpdb->esc_like( $title ) ) . "%'";
	}
	return $where;
}

/*
 * Remove posts ands comments from dashboard
 */

add_action('admin_menu', 'remove_menus');

function remove_menus ()
{
	remove_menu_page('edit.php');
	remove_menu_page( 'edit-comments.php' );
}


/*
 * Prev and Next links change class
 */

add_filter('next_post_link','add_class_next_post_link',10,1);

function add_class_next_post_link($html){
	return str_replace('<a','<a class="next-item"',$html);
}

add_filter('previous_post_link','add_class_previous_post_link',10,1);

function add_class_previous_post_link($html){
	return str_replace('<a','<a class="prev-item"',$html);
}




