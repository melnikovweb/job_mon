<?php
/*
Block Name: Performance
Description: performance block
Category: custom-blocks
Icon: admin-appearance
Keywords: performance block
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
Example: {"preview_image_help": "/blocks/performance/preview.png"}
*/

if (isset($block['data']['preview_image_help'])) :
	echo '<img src="' . get_template_directory_uri() . $block['data']['preview_image_help'] . '" style="width:100%; height:auto;">';
	return;
endif;

$fields = get_fields();
$context = Timber::context();
$context['fields'] = $fields;
if(isset($fields['tables_file']) && $fields['tables_file']) {
	try {
		$context['tabs'] = get_array_from_xlsx_file($fields['tables_file']);
	} catch (\PhpOffice\PhpSpreadsheet\Exception $e) {
		$context['tabs'] = [];
	}
}
$context['class'] = 'performance';
$context['classes'] = 'gutenberg-block';
$context['block'] = !empty($block) ? $block : null;
$context['block_classes'] = $block['className'] ?? null;

Timber::render('performance/performance.twig', $context);
