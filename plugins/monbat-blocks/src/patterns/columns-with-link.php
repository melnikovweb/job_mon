<?php 

// Columns With Link

$columns_with_link_content = '<!-- wp:group {"layout":{"type":"default"}} -->
<div class="wp-block-group"><!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column {"width":"40%","style":{"spacing":{"padding":{"right":"3%"}}}} -->
<div class="wp-block-column" style="padding-right:3%;flex-basis:40%"><!-- wp:cgb/block-animation-blocks {"animationX":"-101%","duration":"1","fade":"fade"} -->
<div class="wp-block-cgb-block-animation-blocks sk-content-animation"><div class="sk-content-animation__wrapp" data-sk-delay="0" data-sk-duration="1" data-sk-typex="-101%" data-sk-typey="0" data-sk-fade="fade"><!-- wp:heading {"level":3,"textColor":"black","fontSize":"h3"} -->
<h3 class="wp-block-heading has-black-color has-text-color has-h-3-font-size">Bulgarian Industrial Capital Association (BICA)</h3>
<!-- /wp:heading --></div></div>
<!-- /wp:cgb/block-animation-blocks --></div>
<!-- /wp:column -->

<!-- wp:column {"width":"60%"} -->
<div class="wp-block-column" style="flex-basis:60%"><!-- wp:cgb/block-animation-blocks {"animationX":"101%","duration":"1","fade":"fade"} -->
<div class="wp-block-cgb-block-animation-blocks sk-content-animation"><div class="sk-content-animation__wrapp" data-sk-delay="0" data-sk-duration="1" data-sk-typex="101%" data-sk-typey="0" data-sk-fade="fade"><!-- wp:paragraph -->
<p>BICA is the most extensively represented organization of Bulgarian employers with a network of regional chambers in 171 municipalities in the country. As one of the best public listed companies, Monbat is dedicated – just like BICA - to the creation of a favorable economic, cultural and public environment for the local and foreign capital as well as to attracting foreign investment to the country, and improving the standards of information disclosure intended for investors. Furthermore, the company strives to attract foreign investments to the country, improving the standards of information disclosure intended for investors – a goal BICA also strives to achieve together with members’ best practices, sharing and encouraging corporate social responsibility.</p>
<!-- /wp:paragraph -->

<!-- wp:buttons -->
<div class="wp-block-buttons"><!-- wp:button {"className":"is-style-icon-link"} -->
<div class="wp-block-button is-style-icon-link"><a class="wp-block-button__link wp-element-button" href="http://bica-bg.org/bica/?lang=en" target="_blank" rel="noreferrer noopener">GO TO THE SITE</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div></div>
<!-- /wp:cgb/block-animation-blocks --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:spacer {"height":"30px"} -->
<div style="height:30px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer --></div>
<!-- /wp:group -->';

register_block_pattern( 'cgb/columns-with-link', [
    'categories'    => [ 'monbat' ],
    'content'       => $columns_with_link_content,
    'description'   => 'A columns with link block pattern',
    'keywords'      => 'text',
    'title'         => 'Columns With Link Pattern',
    'viewportWidth' => 800,
],);