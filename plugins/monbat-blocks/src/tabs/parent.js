/**
 * BLOCK: Tabs Block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

import { cyrToLat } from '../cyrillicToTranslit';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks, InspectorControls } = wp.blockEditor;
const { PanelBody, ToggleControl, Button } = wp.components;
const { Fragment } = wp.element;

const convertToSlug = ( str ) => cyrToLat( str.toString() ).toLowerCase().trim().replace( /[^\w\s-]/g, '' ).replace( /[\s_-]+/g, '_' ).replace( /^-+|-+$/g, '' );

registerBlockType( 'cgb/tabs-block', {
	title: __( 'Tabs Block' ),
	icon: 'columns',
	category: 'monbat-blocks',
	attributes: {
		items: {
			type: 'array',
			default: [ { title: 'Title', activeTab: false } ],
		},
	},
	keywords: [
		__( 'monbat' ),
		__( 'column' ),
		__( 'tabs' ),
	],

	edit: ( { attributes, setAttributes } ) => {
		const handleAddItem = () => {
			const items = [ ...attributes.items ];
			items.push( {
				title: {
					type: 'string',
					default: 'Title',
				},
				activeTab: {
					type: 'boolean',
					default: false,
				},
			} );
			setAttributes( { items } );
		};

		const handleRemoveItem = ( index ) => {
			const items = [ ...attributes.items ];
			items.splice( index, 1 );
			setAttributes( { items } );
		};

		const tabsActive = ( e ) => {
			if ( e.target.classList.contains( 'tabs-block__button' ) && ! e.target.classList.contains( 'active' ) ) {
				const tabsBlock = e.target.closest( '.tabs-block' );
				const activeButton = tabsBlock.querySelector( '.tabs-block__button.active' );
				const activePanel = tabsBlock.querySelector( '.tabs-block__item.active' );
				const newPanel = tabsBlock.querySelector( `[data-panel="${ e.target.dataset.tab }"]` );

				if ( activeButton ) {
					activeButton.classList.remove( 'active' );
				}
				e.target.classList.add( 'active' );

				if ( activePanel ) {
					activePanel.classList.remove( 'active' );
				}
				if ( newPanel ) {
					newPanel.classList.add( 'active' );
				}
			}
		};

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Tab Buttons' ) }>
						{ attributes.items.map( ( item, index ) => {
							return (
								<div className="tabs-block__side" key={ index }>
									<Button
										className="remove-item"
										icon="no-alt"
										label="Delete image"
										onClick={ () => handleRemoveItem( index ) }
									/>
									<ToggleControl
										label={ __( 'Default / Active' ) }
										help={ __( 'Please choose only one panel' ) }
										checked={ item.activeTab }
										onChange={ ( content ) => {
											const items = [ ...attributes.items ];
											item.activeTab = content;
											setAttributes( { items } );
										} }
									/>
									<p className={ `tabs-block__button ${ item.activeTab ? 'active' : '' }` } data-tab={ convertToSlug( item.title ) }>
										<RichText
											tagName="span"
											onChange={ ( content ) => {
												const items = [ ...attributes.items ];
												item.title = content ? content : 'Title';
												setAttributes( { items } );
											} }
											value={ item.title ? item.title : 'Title' }
											placeholder="Title"
											default="Title"
										/>
									</p>
								</div>
							);
						} ) }
						<Button isDefault onClick={ handleAddItem.bind( this ) }>{ __( 'Add items' ) }</Button>
					</PanelBody>
				</InspectorControls>
				<div className="tabs-block">
					<div className="tabs-wrapper">
						<div className="sk-container sk-container--md">
							<div className="tabs-block__buttons tabs">
								{ attributes.items.map( ( item, index ) => {
									return (
										<button key={ index } onClick={ tabsActive } className={ `tabs-block__button ${ item.activeTab ? 'active' : '' }` } data-tab={ convertToSlug( item.title ) }>
											<RichText
												tagName="span"
												onChange={ ( content ) => {
													const items = [ ...attributes.items ];
													item.title = content ? content : 'Title';
													setAttributes( { items } );
												} }
												value={ item.title ? item.title : 'Title' }
												placeholder="Title"
											/>
										</button>
									);
								} ) }
							</div>
						</div>
					</div>
					<div className="tabs-block__panels panels">
						<div className="sk-container sk-container--md">
							<InnerBlocks template={ [ [ 'cgb/tabs-block-item' ] ] } allowedBlocks={ [ 'cgb/tabs-block-item' ] } />
						</div>
					</div>
				</div>
			</Fragment>
		);
	},

	save: ( { attributes } ) => {
		return (
			<div className="tabs-block">
				<div className="tabs-wrapper">
					<div className="sk-container sk-container--md">
						<div className="tabs-block__buttons tabs">
							{ attributes.items.map( ( item, index ) => {
								return (
									<button key={ index } className={ `tabs-block__button ${ item.activeTab ? 'active' : '' }` } tabIndex="0" data-tab={ convertToSlug( item.title ) }>
										<RichText.Content
											tagName="span"
											value={ item.title }
										/>
									</button>
								);
							} ) }
						</div>
					</div>
				</div>
				<div className="tabs-block__panels panels">
					<div className="sk-container sk-container--md">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
	},
} );
