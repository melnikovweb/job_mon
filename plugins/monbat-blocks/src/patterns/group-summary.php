<?php 

// Group Summary

$group_summary_content = '<!-- wp:cgb/block-animation-blocks {"delay":"0.3","duration":"1","fade":"fade"} -->
<div class="wp-block-cgb-block-animation-blocks sk-content-animation"><div class="sk-content-animation__wrapp" data-sk-delay="0.3" data-sk-duration="1" data-sk-typex="0" data-sk-typey="0" data-sk-fade="fade"><!-- wp:group {"backgroundColor":"border","layout":{"type":"default"}} -->
<div id="highlights" class="wp-block-group has-border-background-color has-background"><!-- wp:group {"style":{"spacing":{"padding":{"top":"2.8em","bottom":"4em"}}},"className":"is-style-container\u002d\u002dmd","layout":{"type":"default"}} -->
<div class="wp-block-group is-style-container--md" style="padding-top:2.8em;padding-bottom:4em"><!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column {"width":"35%","style":{"spacing":{"padding":{"right":"5%"}}}} -->
<div class="wp-block-column" style="padding-right:5%;flex-basis:35%"><!-- wp:heading {"style":{"spacing":{"margin":{"bottom":"15px"}}},"textColor":"primary","fontSize":"h2-up"} -->
<h2 class="wp-block-heading has-primary-color has-text-color has-h-2-up-font-size" style="margin-bottom:15px">For Q1 2023, the group generated (EUR \'000)</h2>
<!-- /wp:heading --></div>
<!-- /wp:column -->

<!-- wp:column {"width":"65%"} -->
<div class="wp-block-column" style="flex-basis:65%"><!-- wp:cgb/group-summary -->
<div class="wp-block-cgb-group-summary group-summary"><!-- wp:cgb/group-summary-item {"title":"REVENUE from continuing operations","number":"53 575","percent":"10.8% YTD-t-YTD"} -->
<div class="wp-block-cgb-group-summary-item group-summary__item"><p class="group-summary__title">REVENUE from continuing operations</p><p class="group-summary__number">53 575</p><p class="group-summary__percent">10.8% YTD-t-YTD</p></div>
<!-- /wp:cgb/group-summary-item -->

<!-- wp:cgb/group-summary-item {"title":"NORMALIZED EBITDA from continuing operations","number":"4 438","percent":"(29.51%) YTD-t-YTD"} -->
<div class="wp-block-cgb-group-summary-item group-summary__item"><p class="group-summary__title">NORMALIZED EBITDA from continuing operations</p><p class="group-summary__number">4 438</p><p class="group-summary__percent">(29.51%) YTD-t-YTD</p></div>
<!-- /wp:cgb/group-summary-item -->

<!-- wp:cgb/group-summary-item {"title":"PROFIT BEFORE TAX from continuing operations","number":"1 187","percent":"(71.41)% YTD-t-YTD"} -->
<div class="wp-block-cgb-group-summary-item group-summary__item"><p class="group-summary__title">PROFIT BEFORE TAX from continuing operations</p><p class="group-summary__number">1 187</p><p class="group-summary__percent">(71.41)% YTD-t-YTD</p></div>
<!-- /wp:cgb/group-summary-item --></div>
<!-- /wp:cgb/group-summary --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:group --></div>
<!-- /wp:group --></div></div>
<!-- /wp:cgb/block-animation-blocks -->';

register_block_pattern( 'cgb/group-summary', [
    'categories'    => [ 'monbat' ],
    'content'       => $group_summary_content,
    'description'   => 'A group-summary block pattern',
    'keywords'      => 'summary',
    'title'         => 'Group Summary Pattern',
    'viewportWidth' => 800,
],);