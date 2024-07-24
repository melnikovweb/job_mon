<?php

/**
 * Change default Wordpress image template.
 *
 * @param string $filtered_image Full img tag with attributes that will replace the source img tag.
 * @param string $context Additional context, like the current filter name or the function name from where this was called.
 * @param int $attachment_id The image attachment ID. May be 0 in case the image is not an attachment.
 *
 * @return string HTML image
 */
function change_default_image_template($filtered_image, $context, $attachment_id)
{
  if ($attachment_id) {
    $filtered_image = Timber::compile(
      '/templates/parts/components/image.twig',
      [
        'id' => $attachment_id,
        'sizes' => '100vw'
      ]
    );
  }

  return $filtered_image;
}

// add_filter('wp_content_img_tag', 'change_default_image_template', 10, 3);

add_filter( 'gform_submit_button', 'input_to_button', 10, 2 );
function input_to_button( $button, $form ) {
     
    $dom = new DOMDocument();
    $dom->loadHTML( '<?xml encoding="utf-8" ?>' . $button );
    $input = $dom->getElementsByTagName( 'input' )->item(0);
    $new_button = $dom->createElement( 'button' );
    $new_button->appendChild( $dom->createTextNode( $input->getAttribute( 'value' ) ) );
    $input->removeAttribute( 'value' );
    $classes = $input->getAttribute( 'class' );
    $classes .= " sk-btn sk-btn--primary";
    $input->setAttribute( 'class', $classes );
    foreach( $input->attributes as $attribute ) {
        $new_button->setAttribute( $attribute->name, $attribute->value );
    }
    $input->parentNode->replaceChild( $new_button, $input );
 
    return $dom->saveHtml( $new_button );
}