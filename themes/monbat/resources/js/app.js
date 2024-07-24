import './utils/none-transitions';
import {homeSlider, gallerySlider} from './modules/slider';
import menuGroup from "./modules/menu";
import progressBarObj from "./modules/progressBar";
import ScrollToTop from "./modules/scroll-top";
import dropdown from "./modules/dropdown";
import {scrollToSection} from "./modules/scrollToSection";
import {initContentAnimations, perfomanceIndicatorAnimation} from "./modules/animation";
import {popupInit} from "./modules/popup";
import {updateFormSelected} from "./modules/updateFormSelected";
import customSelect from "./modules/customSelect";
import {accordionInit} from "./modules/accordion";
import {shortcodeChartSofix, shortcodeChartBond, shortcodeChartStock} from "./modules/shortcodeCharts";
import shortcodeTables from "./modules/shortcodeTables";
import {tabsInit} from "./modules/tabs";
import {metalExchangeControls} from "./modules/metalExchangeControls";
import {strategyAccordionSticky} from "./modules/animation";
import {headerHeight, accordionHeaderHeight} from './modules/headerHeight';

const homeSliderTag = document.querySelector('.home-slider.swiper');
const homePage = document.querySelector('.home');
const scrollButton = document.querySelector('.scroll-top');
const relatedPages = document.querySelector('.related__pages');
const popupItems = document.querySelectorAll('.sk-popup');
const selectItems = document.querySelectorAll('select.new-select, .new-select select');
const popupWrapp = document.querySelector('.sk-popup__wrapp');
const accordions = document.querySelectorAll('.wp-block-cgb-accordion.accordion, .wp-block-cgb-strategy-accordion.strategy-accordion');
const gallerySliderTag = document.querySelectorAll('.gallery-slider.swiper');
const tabsTag = document.querySelectorAll('.tabs-block');
const metalExchangeTag = document.querySelectorAll('.metal-exchange');
const strategyAccordionTag = document.querySelectorAll('.strategy-accordion');

window.addEventListener('load', () => {
  if (homeSliderTag) homeSlider(homeSliderTag);

  menuGroup.init();
  scrollToSection();
  if (popupItems && popupWrapp) popupInit(popupWrapp);
  if (accordions) accordionInit();
  if (tabsTag) tabsInit();
  if (gallerySliderTag) gallerySlider(gallerySliderTag);
  if (metalExchangeTag) metalExchangeControls(metalExchangeTag);
  if (strategyAccordionTag) strategyAccordionSticky();
  if (strategyAccordionTag) accordionHeaderHeight();

  headerHeight();
});

window.addEventListener('DOMContentLoaded', () => {
  updateFormSelected();
  if (selectItems.length > 0) customSelect.initAll(selectItems);
  if (!homePage) progressBarObj.init();
  if (scrollButton) ScrollToTop.init();
  if (relatedPages) dropdown.init();
  initContentAnimations();
  perfomanceIndicatorAnimation();

  shortcodeChartSofix.init().then();
  shortcodeChartBond.init().then();
  shortcodeChartStock.init().then();

  shortcodeTables.init().then();

  if (document.querySelectorAll('.gform-body').length > 0) {
    jQuery(document).on('gform_page_loaded', function () {
      customSelect.initAll(document.querySelectorAll('select.new-select, .new-select select'));
    });
  }
});

window.addEventListener('resize', () => {
  headerHeight();
  if (strategyAccordionTag) accordionHeaderHeight();
});
