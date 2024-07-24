<?php 

// Sample Text

$history_content = '<!-- wp:group {"className":"is-style-container\u002d\u002dmd","layout":{"type":"default"}} -->
<div id="1959-1999" class="wp-block-group is-style-container--md"><!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column {"width":"40%","style":{"spacing":{"padding":{"right":"3%"}}}} -->
<div class="wp-block-column" style="padding-right:3%;flex-basis:40%"><!-- wp:cgb/block-animation-blocks {"animationX":"-101%","duration":"1","fade":"fade"} -->
<div class="wp-block-cgb-block-animation-blocks sk-content-animation"><div class="sk-content-animation__wrapp" data-sk-delay="0" data-sk-duration="1" data-sk-typex="-101%" data-sk-typey="0" data-sk-fade="fade"><!-- wp:heading {"className":"is-style-section-title"} -->
<h2 class="wp-block-heading is-style-section-title">Company inception and transition into private sector</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"className":"is-style-subtitle"} -->
<p class="is-style-subtitle">Establishment of manufacturing plants</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"className":"is-style-subtitle"} -->
<p class="is-style-subtitle">Privatization of the Company</p>
<!-- /wp:paragraph --></div></div>
<!-- /wp:cgb/block-animation-blocks --></div>
<!-- /wp:column -->

<!-- wp:column {"width":"60%"} -->
<div class="wp-block-column" style="flex-basis:60%"><!-- wp:cgb/block-animation-blocks {"animationX":"101%","duration":"1","fade":"fade"} -->
<div class="wp-block-cgb-block-animation-blocks sk-content-animation"><div class="sk-content-animation__wrapp" data-sk-delay="0" data-sk-duration="1" data-sk-typex="101%" data-sk-typey="0" data-sk-fade="fade"><!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group"><!-- wp:paragraph {"className":"is-style-custom-text-format"} -->
<p class="is-style-custom-text-format">1959</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Opening of the starter batteries factory in Montana, Bulgaria, under state ownership</p>
<!-- /wp:paragraph -->

<!-- wp:spacer {"height":"10px"} -->
<div style="height:10px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer --></div>
<!-- /wp:group -->

<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group"><!-- wp:paragraph {"className":"is-style-custom-text-format"} -->
<p class="is-style-custom-text-format">1965</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Start Plant established in Dobrich. The facility begins production of lead-acid batteries mainly for export to AvtoVaz in Russia</p>
<!-- /wp:paragraph -->

<!-- wp:spacer {"height":"10px"} -->
<div style="height:10px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer --></div>
<!-- /wp:group -->

<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group"><!-- wp:paragraph {"className":"is-style-custom-text-format"} -->
<p class="is-style-custom-text-format">1983 - 1986</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Re-equipment of the production factory with modern machinery in Montana</p>
<!-- /wp:paragraph -->

<!-- wp:spacer {"height":"10px"} -->
<div style="height:10px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer --></div>
<!-- /wp:group -->

<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group"><!-- wp:paragraph {"className":"is-style-custom-text-format"} -->
<p class="is-style-custom-text-format">1992</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The Company is filed in the Commercial register under the name AKUMIKAR AD&nbsp; and headquartered in Mihailovgrad (now Montana)</p>
<!-- /wp:paragraph -->

<!-- wp:spacer {"height":"10px"} -->
<div style="height:10px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer --></div>
<!-- /wp:group -->

<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group"><!-- wp:paragraph {"className":"is-style-custom-text-format"} -->
<p class="is-style-custom-text-format">1998</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>AKUMIKAR AD is privatized and becomes a private company</p>
<!-- /wp:paragraph -->

<!-- wp:spacer {"height":"10px"} -->
<div style="height:10px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer --></div>
<!-- /wp:group -->

<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group"><!-- wp:paragraph {"className":"is-style-custom-text-format"} -->
<p class="is-style-custom-text-format">1999</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Monbat company is certified for compliance with the requirements of ISO 9001</p>
<!-- /wp:paragraph -->

<!-- wp:spacer {"height":"10px"} -->
<div style="height:10px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer --></div>
<!-- /wp:group --></div></div>
<!-- /wp:cgb/block-animation-blocks --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:group -->';

register_block_pattern( 'cgb/history-content', [
    'categories'    => [ 'monbat' ],
    'content'       => $history_content,
    'description'   => 'A history content block pattern',
    'keywords'      => 'text',
    'title'         => 'History Content Pattern',
    'viewportWidth' => 800,
],);