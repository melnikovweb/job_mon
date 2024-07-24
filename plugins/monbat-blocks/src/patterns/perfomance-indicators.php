<?php 

// Perfomance Indicators

$perfomance_indicators_content = '<!-- wp:cgb/perfomance-indicators {"title":"\u003ca href=\u0022'.get_home_url().'/investors/key-performance-indicators/\u0022 data-type=\u0022page\u0022 data-id=\u002266\u0022\u003eSource of wealth\u003c/a\u003e","boxTitle":"EV Multiplier – 12.73 times","number":"8.9%","legend":"Y-t-Y","trend":"bottom"} -->
<div class="wp-block-cgb-perfomance-indicators perfomance-indicators"><div class="perfomance-indicators__main"><p class="perfomance-indicators__title"><a href="'.get_home_url().'/investors/key-performance-indicators/" data-type="page" data-id="66">Source of wealth</a></p><div class="perfomance-indicators__box"><span class="perfomance-indicators__box-title">EV Multiplier – 12.73 times</span><span class="perfomance-indicators__trend perfomance-indicators__trend--bottom"><span class="trend-icon trend-icon--bottom"></span><span class="perfomance-indicators__number">8.9%</span></span><span class="perfomance-indicators__legend">Y-t-Y</span></div></div><!-- wp:cgb/perfomance-indicators-item {"title":"\u003ca href=\u0022'.get_home_url().'/investors/key-performance-indicators/\u0022 data-type=\u0022page\u0022 data-id=\u002266\u0022\u003eEnterprise value\u003c/a\u003e","boxTitle":"EV - 204 772 (EUR \'000)","boxNumber":"1","number":"(2.4%)","legend":"Y-t-Y","trend":"bottom"} -->
<div class="wp-block-cgb-perfomance-indicators-item perfomance-indicators__item"><span class="perfomance-indicators__box-number">1</span><p class="perfomance-indicators__item-title"><a href="'.get_home_url().'/investors/key-performance-indicators/" data-type="page" data-id="66">Enterprise value</a></p><div class="perfomance-indicators__box"><span class="perfomance-indicators__box-title">EV - 204 772 (EUR \'000)</span><span class="perfomance-indicators__trend perfomance-indicators__trend--bottom"><span class="trend-icon trend-icon--bottom"></span><span class="perfomance-indicators__number">(2.4%)</span></span><span class="perfomance-indicators__legend">Y-t-Y</span></div></div>
<!-- /wp:cgb/perfomance-indicators-item -->

<!-- wp:cgb/perfomance-indicators-item {"title":"\u003ca href=\u0022'.get_home_url().'/investors/key-performance-indicators/\u0022 data-type=\u0022page\u0022 data-id=\u002266\u0022\u003eShareholders earnings\u003c/a\u003e","boxTitle":"EPS – 0.01 EUR","boxNumber":"2","number":"(92.5)%","legend":"Y-t-Y","trend":"bottom"} -->
<div class="wp-block-cgb-perfomance-indicators-item perfomance-indicators__item"><span class="perfomance-indicators__box-number">2</span><p class="perfomance-indicators__item-title"><a href="'.get_home_url().'/investors/key-performance-indicators/" data-type="page" data-id="66">Shareholders earnings</a></p><div class="perfomance-indicators__box"><span class="perfomance-indicators__box-title">EPS – 0.01 EUR</span><span class="perfomance-indicators__trend perfomance-indicators__trend--bottom"><span class="trend-icon trend-icon--bottom"></span><span class="perfomance-indicators__number">(92.5)%</span></span><span class="perfomance-indicators__legend">Y-t-Y</span></div></div>
<!-- /wp:cgb/perfomance-indicators-item -->

<!-- wp:cgb/perfomance-indicators-item {"title":"\u003ca href=\u0022'.get_home_url().'/investors/key-performance-indicators/\u0022 data-type=\u0022page\u0022 data-id=\u002266\u0022\u003eOperational performance\u003c/a\u003e","boxTitle":"Adjusted EBITDA from continuing operations - 16 084 (EUR \'000)","boxNumber":"3","number":"(10.4)%","legend":"Y-t-Y","trend":"bottom"} -->
<div class="wp-block-cgb-perfomance-indicators-item perfomance-indicators__item"><span class="perfomance-indicators__box-number">3</span><p class="perfomance-indicators__item-title"><a href="'.get_home_url().'/investors/key-performance-indicators/" data-type="page" data-id="66">Operational performance</a></p><div class="perfomance-indicators__box"><span class="perfomance-indicators__box-title">Adjusted EBITDA from continuing operations - 16 084 (EUR \'000)</span><span class="perfomance-indicators__trend perfomance-indicators__trend--bottom"><span class="trend-icon trend-icon--bottom"></span><span class="perfomance-indicators__number">(10.4)%</span></span><span class="perfomance-indicators__legend">Y-t-Y</span></div></div>
<!-- /wp:cgb/perfomance-indicators-item -->

<!-- wp:cgb/perfomance-indicators-item {"title":"\u003ca href=\u0022'.get_home_url().'/investors/key-performance-indicators/\u0022 data-type=\u0022page\u0022 data-id=\u002266\u0022\u003eValuation\u003c/a\u003e","boxTitle":"M/B – 0.85 times","boxNumber":"4","number":"(8.9)%","legend":"Y-t-Y","trend":"bottom"} -->
<div class="wp-block-cgb-perfomance-indicators-item perfomance-indicators__item"><span class="perfomance-indicators__box-number">4</span><p class="perfomance-indicators__item-title"><a href="'.get_home_url().'/investors/key-performance-indicators/" data-type="page" data-id="66">Valuation</a></p><div class="perfomance-indicators__box"><span class="perfomance-indicators__box-title">M/B – 0.85 times</span><span class="perfomance-indicators__trend perfomance-indicators__trend--bottom"><span class="trend-icon trend-icon--bottom"></span><span class="perfomance-indicators__number">(8.9)%</span></span><span class="perfomance-indicators__legend">Y-t-Y</span></div></div>
<!-- /wp:cgb/perfomance-indicators-item --><div class="perfomance-indicators__arrows"><div class="perfomance-indicators__arrow perfomance-indicators__arrow--left-bottom"></div><div class="perfomance-indicators__arrow perfomance-indicators__arrow--right-bottom"></div><div class="perfomance-indicators__arrow perfomance-indicators__arrow--right-top"></div><div class="perfomance-indicators__arrow perfomance-indicators__arrow--left-top"></div></div></div>
<!-- /wp:cgb/perfomance-indicators -->';

register_block_pattern( 'cgb/perfomance-indicators', [
    'categories'    => [ 'monbat' ],
    'content'       => $perfomance_indicators_content,
    'description'   => 'A pefomance indicators block pattern',
    'keywords'      => 'perfomance',
    'title'         => 'Perfomance Indicators Pattern',
    'viewportWidth' => 800,
],);