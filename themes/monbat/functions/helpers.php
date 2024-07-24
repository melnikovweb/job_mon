<?php
/**
 * Custom function for showing var_dump() result decorated on browser
 */
function pvd($var)
{
	echo "<pre style='font-size:16px; overflow-x: hidden; '>";
	var_dump($var);
	echo "</pre>";
}

/**
 * @param $filename
 *
 * @return void
 */
function get_image($filename)
{
	echo get_template_directory_uri() . '/resources/img/' . $filename;
}

/**
 * @param $file
 * @param $is_fromlibrary
 *
 * @return void
 */
function inline_svg($file, $is_fromlibrary = null)
{
	if ($is_fromlibrary) {
		$svgString = @file_get_contents($file);
		$svgString = str_replace('<?xml version="1.0" encoding="UTF-8"?>', '', $svgString);
		echo $svgString;
	} else {
		echo @file_get_contents(get_template_directory() . '/resources/img/' . $file);
	}
}


/**
 * @param string $item
 */
function get_clean_phone($item)
{
	if (empty($item)) {
		return false;
	}

	return preg_replace("/[^0-9]/", "", $item);
}

function regex_text_to_span($text)
{

	if (empty($text)) {
		return false;
	}

	return preg_replace('/\[(.*?)\]/', '<span>$1</span>', $text);

}


/**
 * @param $arr
 * @param string $key
 * @return bool
 */

if (!function_exists('validate_field')) {

	function validate_field($arr, string $key = ''): bool
	{
		if (is_array($arr) && $key && array_key_exists($key, $arr) && !empty($arr[$key])) {
			return TRUE;
		}

		return FALSE;
	}
}

/**
 * @param $menu
 * @param string $current_page_id
 * @return array
 */

if (!function_exists('breadcrumbs')) {

	function breadcrumbs(array $menu, string $current_page_id = ''): array
	{

		$parents = [];
		$current_parent = [];
		$children = [];
		$ancestors = get_ancestors($current_page_id, 'page');

		foreach ($menu as $menu_item) {
			if (!$menu_item->menu_item_parent) {
				$parents[] = array(
					'ID' => $menu_item->ID,
					'title' => $menu_item->title,
					'url' => $menu_item->url,
					'current' => (in_array($menu_item->object_id, $ancestors) || $menu_item->object_id == $current_page_id) ?? true,
					'target' => $menu_item->target,
				);

				if (in_array($menu_item->object_id, $ancestors) || $menu_item->object_id == $current_page_id) {
					$current_parent = [
						'ID' => $menu_item->ID,
						'title' => $menu_item->title,
						'url' => $menu_item->url,
						'target' => $menu_item->target,
						'page_id' => $menu_item->object_id,
					];
					continue;
				}
				continue;
			}

			if (isset($current_parent['ID']) && $current_parent['page_id'] !== $current_page_id && $menu_item->menu_item_parent == $current_parent['ID']) {
				$children[] = [
					'ID' => $menu_item->ID,
					'title' => $menu_item->title,
					'url' => $menu_item->url,
					'current' => (in_array($menu_item->object_id, $ancestors) || $menu_item->object_id == $current_page_id) ?? true,
					'target' => $menu_item->target,
				];
			}
		}

		return [
			'parents' => $parents,
			'current_parent' => $current_parent,
			'children' => $children,
			'current_title' => get_the_title()
		];
	}
}

/**
 * @param string $id
 * @param string $activeSheet
 * @return array
 */


if (!function_exists('get_array_from_xlsx_file')) {

	/**
	 * @throws \PhpOffice\PhpSpreadsheet\Exception
	 */
	function get_array_from_xlsx_file(string $id, $activeSheet = null): array
	{

		$file = get_attached_file($id);

		if (!file_exists($file)) return [];

		$spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($file);
		$sheetCount = $spreadsheet->getSheetCount();
		$data = [];

		for ($i = 0; $i < $sheetCount; $i++) {
			$activeSheet = $spreadsheet->getSheet($i);
			$data[] = [
				'sheetName' => $activeSheet->getTitle(),
				'data' => $activeSheet->toArray(null, true, true, true),
			];
		}

		return $data;
	}
}

/**
 * @param string $string
 * @return string
 */

if (!function_exists('slugify')) {
	function slugify($string)
	{
		$string_translite = transliterator_transliterate("Any-Latin; NFD; [:Nonspacing Mark:] Remove; NFC; [:Punctuation:] Remove; Lower();", $string);
		return strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $string_translite)));
	}
}


/**
 * @param string $string
 * @param string $string
 * @return float
 */


if (!function_exists('pct_change')) {
	function pct_change($old, $new, int $precision = 2): float
	{
		if ($old == 0) {
			$old++;
			$new++;
		}

		$change = (($new - $old) / $old) * 100;

		return round($change, $precision);
	}
}
