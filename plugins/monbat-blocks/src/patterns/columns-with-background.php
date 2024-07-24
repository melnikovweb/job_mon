<?php 

// Columns With Background

$columns_with_background_content = '<!-- wp:group {"style":{"spacing":{"padding":{"top":"3.5%","bottom":"5.7%"}}},"backgroundColor":"border","layout":{"type":"default"}} -->
<div id="competitive-edge" class="wp-block-group has-border-background-color has-background" style="padding-top:3.5%;padding-bottom:5.7%"><!-- wp:group {"className":"is-style-container\u002d\u002dmd","layout":{"type":"default"}} -->
<div class="wp-block-group is-style-container--md"><!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column {"width":"35%","style":{"spacing":{"padding":{"right":"5%"}}}} -->
<div class="wp-block-column" style="padding-right:5%;flex-basis:35%"><!-- wp:heading {"textColor":"primary","fontSize":"h2-up"} -->
<h2 class="wp-block-heading has-primary-color has-text-color has-h-2-up-font-size">Competitive Edge</h2>
<!-- /wp:heading --></div>
<!-- /wp:column -->

<!-- wp:column {"width":"65%"} -->
<div class="wp-block-column" style="flex-basis:65%"><!-- wp:paragraph -->
<p>The vertically integrated group, with currently four recycling plants allocated to its diverse sourcing base, allows Monbat Group to constantly apply opportunity gain management.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Vertical integration not only brings high integrated margins; it also allows for natural hedging to lead price variations on the London Metal Exchange throughout the year.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>In instances of abrupt LME behavior, many players can suffer missing trading volumes or squeezed margins. At Monbat, this brings the chance to tap into a window of opportunity.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Recycling is no longer a matter of sourcing but rather a conscious business choice.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:group --></div>
<!-- /wp:group -->';

register_block_pattern( 'cgb/columns-with-background', [
    'categories'    => [ 'monbat' ],
    'content'       => $columns_with_background_content,
    'description'   => 'A columns with background block pattern',
    'keywords'      => 'columns',
    'title'         => 'Columns With Background Pattern',
    'viewportWidth' => 800,
],);