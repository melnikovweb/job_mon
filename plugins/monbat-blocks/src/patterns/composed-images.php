<?php 

// Composed Images

$composed_images_content = '<!-- wp:cgb/composed-images -->
<div class="wp-block-cgb-composed-images composed-images"><div class="composed-images__wrapp sk-container sk-container--md"><!-- wp:cgb/block-animation-blocks {"animationX":"-101%","duration":"1","fade":"fade"} -->
<div class="wp-block-cgb-block-animation-blocks sk-content-animation"><div class="sk-content-animation__wrapp" data-sk-delay="0" data-sk-duration="1" data-sk-typex="-101%" data-sk-typey="0" data-sk-fade="fade"><!-- wp:cgb/composed-image -->
<div class="wp-block-cgb-composed-image composed-images__item"><!-- wp:image {"id":407,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="'.get_home_url().'/wp-content/uploads/2023/07/air20190219-012_0-1024x596.jpg" alt="Monbat Group" class="wp-image-407"/></figure>
<!-- /wp:image --></div>
<!-- /wp:cgb/composed-image --></div></div>
<!-- /wp:cgb/block-animation-blocks -->

<!-- wp:cgb/block-animation-blocks {"animationX":"101%","duration":"1","fade":"fade"} -->
<div class="wp-block-cgb-block-animation-blocks sk-content-animation"><div class="sk-content-animation__wrapp" data-sk-delay="0" data-sk-duration="1" data-sk-typex="101%" data-sk-typey="0" data-sk-fade="fade"><!-- wp:cgb/composed-image -->
<div class="wp-block-cgb-composed-image composed-images__item"><!-- wp:image {"id":409,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="'.get_home_url().'/wp-content/uploads/2023/07/air20171012-011_1-1024x584.jpg" alt="Monbat Group" class="wp-image-409"/></figure>
<!-- /wp:image --></div>
<!-- /wp:cgb/composed-image --></div></div>
<!-- /wp:cgb/block-animation-blocks --></div></div>
<!-- /wp:cgb/composed-images -->';

register_block_pattern( 'cgb/composed-images', [
    'categories'    => [ 'monbat' ],
    'content'       => $composed_images_content,
    'description'   => 'A composedimages block pattern',
    'keywords'      => 'text',
    'title'         => 'Composed Images Pattern',
    'viewportWidth' => 800,
],);