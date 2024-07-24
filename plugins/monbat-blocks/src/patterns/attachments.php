<?php 

// Sample Text

$attachments_content = '<!-- wp:group {"className":"is-style-container\u002d\u002dmd","layout":{"type":"default"}} -->
<div class="wp-block-group is-style-container--md"><!-- wp:cgb/attachments -->
<div class="wp-block-cgb-attachments attachments"><h3 class="attachments__title sk-section-title">Attached</h3><div class="attachments__media"><!-- wp:cgb/attachment-item {"title":"Articles of association of Monbat AD","documentUrl":"'.get_home_url().'/wp-content/uploads/2023/07/ustav_monbat_1.pdf","uploadedToTitle":"ustav_monbat_1","filesizeHumanReadable":"2 MB","dateFormatted":"2021-06-24T16:45:00","subtype":"pdf"} -->
<div class="wp-block-cgb-attachment-item attachments__item article-document"><p class="article-document__title"><a class="article-document__url" href="'.get_home_url().'/wp-content/uploads/2023/07/ustav_monbat_1.pdf" target="_blank" rel="noreferrer noopener"><span class="article-document__text">Articles of association of Monbat AD</span></a></p><div class="article-document__info"><div class="article-document__date">24/06/2021</div><div class="article-document__type">pdf</div><a class="article-document__icon" href="'.get_home_url().'/wp-content/uploads/2023/07/ustav_monbat_1.pdf" target="_blank" download rel="noreferrer noopener"><span>Download</span></a></div></div>
<!-- /wp:cgb/attachment-item -->

<!-- wp:cgb/attachment-item {"title":"Report for the implementation of the Remuneration Policy of the members of the Board of Directors of Monbat AD for 2020","documentUrl":"'.get_home_url().'/wp-content/uploads/2023/05/monbat_deklaracia_31032023_en.pdf","uploadedToTitle":"monbat_deklaracia_31032023_en","filesizeHumanReadable":"139 KB","dateFormatted":"2021-06-10T16:47:00","subtype":"pdf"} -->
<div class="wp-block-cgb-attachment-item attachments__item article-document"><p class="article-document__title"><a class="article-document__url" href="'.get_home_url().'/wp-content/uploads/2023/05/monbat_deklaracia_31032023_en.pdf" target="_blank" rel="noreferrer noopener"><span class="article-document__text">Report for the implementation of the Remuneration Policy of the members of the Board of Directors of Monbat AD for 2020</span></a></p><div class="article-document__info"><div class="article-document__date">10/06/2021</div><div class="article-document__type">pdf</div><a class="article-document__icon" href="'.get_home_url().'/wp-content/uploads/2023/05/monbat_deklaracia_31032023_en.pdf" target="_blank" download rel="noreferrer noopener"><span>Download</span></a></div></div>
<!-- /wp:cgb/attachment-item --></div></div>
<!-- /wp:cgb/attachments -->

<!-- wp:spacer {"height":"8em"} -->
<div style="height:8em" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer --></div>
<!-- /wp:group -->';

register_block_pattern( 'cgb/attachments', [
    'categories'    => [ 'monbat' ],
    'content'       => $attachments_content,
    'description'   => 'A attachments block pattern',
    'keywords'      => 'text',
    'title'         => 'Attachments Pattern',
    'viewportWidth' => 800,
],);