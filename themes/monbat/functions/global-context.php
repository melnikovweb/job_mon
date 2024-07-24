<?php

if (class_exists('Timber')) {
	$timber = new Timber\Timber();
	$timber::$dirname = array('templates', 'blocks', 'layouts');

	add_filter('timber/context', 'add_to_context');
}

function add_to_context($context)
{
	$id = get_the_ID();
	$fields = get_fields($id);
	$logo = get_header_image();
	$mime_type = '';

	if ($logo) {
		$file_info = new finfo(FILEINFO_MIME_TYPE);
		$mime_type = $file_info->buffer(@file_get_contents($logo));
	}

	$context['logo_img'] = $logo ? $logo : get_bloginfo('name');
	$context['logo_svg'] = $mime_type === 'image/svg+xml' ? $logo : '';

	$option_fields = get_fields('options');
	$fields = get_fields(get_the_ID());
	$context['option_fields'] = $option_fields;
	$context['search_query'] = get_search_query();
	$context['homelink'] = get_home_url();
	$context['show_currency'] = $fields['show_currency_widget'] ?? null;
	$context['is_front_page'] = is_front_page();
	$context['is_404'] = is_404();
	$context['wpml_current_language'] = apply_filters('wpml_current_language', null);
	$context['menu'] = new Timber\Menu('Primary Menu', array('depth' => 2));


	/**
	 * Related Pages
	 */

	$menu = wp_get_nav_menu_items('Primary Menu');
	$page_navigation = array();
	foreach ($menu as $m) {
		if ($m->menu_item_parent && $m->target !== '_blank') {
			$page_navigation[] = array(
				'ID' => $m->ID,
				'title' => $m->title,
				'url' => $m->url,
				'page_id' => $m->object_id,
			);
		}
	}
	$next = '';
	$previous = '';
	$index = array_search($id, array_column($page_navigation, 'page_id'));
	if ($index !== false) {
		$count = count($page_navigation);
		$next = $page_navigation[($count - 1) == $index ? 0 : $index + 1];
		$previous = $page_navigation[($index == 0) ? $count - 1 : $index - 1];
	}

	$post_type = get_post_type($id);

	if($post_type === 'news') {
		$next = get_next_post_link('%link', '<span>%title</span>', true, '', 'news_type');
		$previous = get_previous_post_link('%link', '<span>%title</span>', true, '', 'news_type');
	}

	$context['next_page'] = $next;
	$context['prev_page'] = $previous;
	$context['related_pages'] = validate_field($fields, 'related_pages') ? $fields['related_pages'] : '';

	/**
	 * Breadcrumbs
	 */

	$context['breadcrumbs'] = breadcrumbs($menu, $id);

	return $context;
}
