<?php 

// Full Width Image

$full_width_image_content = '<!-- wp:group {"layout":{"type":"default"}} -->
<div class="wp-block-group"><!-- wp:cgb/block-animation-blocks {"duration":"1","fade":"fade"} -->
<div class="wp-block-cgb-block-animation-blocks sk-content-animation"><div class="sk-content-animation__wrapp" data-sk-delay="0" data-sk-duration="1" data-sk-typex="0" data-sk-typey="0" data-sk-fade="fade"><!-- wp:image {"align":"full","id":1124,"sizeSlug":"full","linkDestination":"none"} -->
<figure class="wp-block-image alignfull size-full"><img src="'.get_home_url().'/wp-content/uploads/2023/07/liniq_0.jpg" alt="" class="wp-image-1124"/></figure>
<!-- /wp:image --></div></div>
<!-- /wp:cgb/block-animation-blocks --></div>
<!-- /wp:group -->';

register_block_pattern( 'cgb/full-width-image', [
    'categories'    => [ 'monbat' ],
    'content'       => $full_width_image_content,
    'description'   => 'A full width image block pattern',
    'keywords'      => 'text',
    'title'         => 'Full Width Image Pattern',
    'viewportWidth' => 800,
],);