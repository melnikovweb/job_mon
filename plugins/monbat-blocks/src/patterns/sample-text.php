<?php 

// Sample Text

$sample_text_content = '<!-- wp:paragraph --><p>This is an example page. It\'s different from a blog post because it will stay in one place and will show up in your site navigation (in most themes). Most people start with an About page that introduces them to potential site visitors. It might say something like this:</p><!-- /wp:paragraph -->
<!-- wp:quote --><blockquote class="wp-block-quote"><!-- wp:paragraph --><p>Hi there! I\'m a bike messenger by day, aspiring actor by night, and this is my website. I live in Los Angeles, have a great dog named Jack, and I like piña coladas. (And gettin\' caught in the rain.)</p><!-- /wp:paragraph --></blockquote><!-- /wp:quote -->
<!-- wp:paragraph --><p>...or something like this:</p><!-- /wp:paragraph -->
<!-- wp:quote --><blockquote class="wp-block-quote"><!-- wp:paragraph --><p>The XYZ Doohickey Company was founded in 1971, and has been providing quality doohickeys to the public ever since. Located in Gotham City, XYZ employs over 2,000 people and does all kinds of awesome things for the Gotham community.</p><!-- /wp:paragraph --></blockquote><!-- /wp:quote -->
<!-- wp:paragraph --><p>As a new WordPress user, you should go to <a href="/wp-admin/">your dashboard</a> to delete this page and create new pages for your content. Have fun!</p><!-- /wp:paragraph -->';

register_block_pattern( 'cgb/sample-text', [
    'categories'    => [ 'monbat' ],
    'content'       => $sample_text_content,
    'description'   => 'A sample text block pattern',
    'keywords'      => 'text',
    'title'         => 'Sample Text Pattern',
    'viewportWidth' => 800,
],);