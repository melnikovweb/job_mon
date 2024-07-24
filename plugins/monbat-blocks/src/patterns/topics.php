<?php 

// Sample Text

$sample_text_content = '<!-- wp:group {"className":"is-style-container\u002d\u002dmd","layout":{"type":"default"}} -->
<div class="wp-block-group is-style-container--md"><!-- wp:columns {"style":{"spacing":{}},"className":"is-style-default"} -->
<div class="wp-block-columns is-style-default"><!-- wp:column {"width":"25%","style":{"spacing":{"padding":{"right":"3%"}}}} -->
<div class="wp-block-column" style="padding-right:3%;flex-basis:25%"><!-- wp:group {"className":"is-style-mobile-disable","layout":{"type":"default"}} -->
<div class="wp-block-group is-style-mobile-disable"><!-- wp:heading {"style":{"typography":{"textTransform":"uppercase"},"spacing":{"margin":{"bottom":"10px"}}},"textColor":"primary","fontSize":"medium"} -->
<h2 class="wp-block-heading has-primary-color has-text-color has-medium-font-size" style="margin-bottom:10px;text-transform:uppercase">Topics:</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"style":{"spacing":{"margin":{"bottom":"15px"}}},"className":"is-style-topics"} -->
<p class="is-style-topics" style="margin-bottom:15px"><a href="#highlights">Highlights</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"style":{"spacing":{"margin":{"bottom":"15px"}}},"className":"is-style-topics"} -->
<p class="is-style-topics" style="margin-bottom:15px"><a href="#corporate-video">Corporate video</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"style":{"spacing":{"margin":{"bottom":"15px"}}},"className":"is-style-topics"} -->
<p class="is-style-topics" style="margin-bottom:15px"><a href="#business">Business</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"style":{"spacing":{"margin":{"bottom":"15px"}}},"className":"is-style-topics"} -->
<p class="is-style-topics" style="margin-bottom:15px"><a href="#worldwide-presence">Worldwide presence</a></p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:column -->

<!-- wp:column {"width":"75%"} -->
<div class="wp-block-column" style="flex-basis:75%"><!-- wp:paragraph {"style":{"typography":{"fontStyle":"normal","fontWeight":"400"},"spacing":{"margin":{"bottom":"1em"}}},"fontSize":"grand"} -->
<p class="has-grand-font-size" style="margin-bottom:1em;font-style:normal;font-weight:400">As one of the leading European batteries\' producers, the economic group operates under two main business segments - Lead-Acid batteries and Li-Ion high-power solutions.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:group -->';

register_block_pattern( 'cgb/topics', [
    'categories'    => [ 'monbat' ],
    'content'       => $sample_text_content,
    'description'   => 'A topics block pattern',
    'keywords'      => 'text',
    'title'         => 'Topics Text Pattern',
    'viewportWidth' => 800,
],);