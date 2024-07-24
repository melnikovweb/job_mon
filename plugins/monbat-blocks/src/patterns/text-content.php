<?php 

// Text Content

$text_content = '<!-- wp:group {"style":{"spacing":{"padding":{"bottom":"40px"}}},"className":"is-style-container\u002d\u002dmd","layout":{"type":"default"}} -->
<div class="wp-block-group is-style-container--md" style="padding-bottom:40px"><!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column {"width":"40%","style":{"spacing":{"padding":{"right":"3%"}}}} -->
<div class="wp-block-column" style="padding-right:3%;flex-basis:40%"><!-- wp:cgb/block-animation-blocks {"animationX":"-101%","fade":"fade"} -->
<div class="wp-block-cgb-block-animation-blocks sk-content-animation"><div class="sk-content-animation__wrapp" data-sk-delay="0" data-sk-duration="0.6" data-sk-typex="-101%" data-sk-typey="0" data-sk-fade="fade"><!-- wp:heading {"className":"is-style-section-title"} -->
<h2 class="wp-block-heading is-style-section-title">The lead-acid business</h2>
<!-- /wp:heading --></div></div>
<!-- /wp:cgb/block-animation-blocks --></div>
<!-- /wp:column -->

<!-- wp:column {"width":"60%"} -->
<div class="wp-block-column" style="flex-basis:60%"><!-- wp:cgb/block-animation-blocks {"animationX":"101%","fade":"fade"} -->
<div class="wp-block-cgb-block-animation-blocks sk-content-animation"><div class="sk-content-animation__wrapp" data-sk-delay="0" data-sk-duration="0.6" data-sk-typex="101%" data-sk-typey="0" data-sk-fade="fade"><!-- wp:paragraph -->
<p>The lead-acid business is a vertically integrated business model with operating production and recycling facilities in Bulgaria (Monbat AD and Start AD) and recycling plants in Romania, Serbia and Italy. This structure insulates the group from raw material price volatility and enables it to achieve higher operating margins compared to peers.</p>
<!-- /wp:paragraph --></div></div>
<!-- /wp:cgb/block-animation-blocks --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:group -->';

register_block_pattern( 'cgb/text-content', [
    'categories'    => [ 'monbat' ],
    'content'       => $text_content,
    'description'   => 'A text content block pattern',
    'keywords'      => 'text',
    'title'         => 'Text Content Pattern',
    'viewportWidth' => 800,
],);