/**
 * BLOCK: Tabs Block Item
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';
import './parent';

import { cyrToLat } from '../cyrillicToTranslit';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks, InspectorControls } = wp.blockEditor;
const { PanelBody, ToggleControl } = wp.components;
const { Fragment } = wp.element;

const convertToSlug = ( str ) => cyrToLat( str.toString() ).toLowerCase().trim().replace( /[^\w\s-]/g, '' ).replace( /[\s_-]+/g, '_' ).replace( /^-+|-+$/g, '' );

registerBlockType( 'cgb/tabs-block-item', {
	title: __( 'Tabs Block Item' ),
	icon: 'slides',
	category: 'monbat-blocks',
	parent: [ 'cgb/tabs-block' ],
	attributes: {
		panelTitle: {
			type: 'string',
		},
		activeTab: {
			type: 'boolean',
			default: false,
		},
	},
	keywords: [
		__( 'monbat' ),
		__( 'column' ),
		__( 'tabs' ),
	],

	edit: ( { attributes, setAttributes } ) => {
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Panel Settings' ) }>
						<h3 className="panelbody-title">{ __( 'Panel Title' ) }</h3>
						<p className="panelbody-help">{ __( 'Shoold be the same with title from tab buttons.' ) }</p>
						<RichText
							tagName="p"
							placeholder="Title"
							value={ attributes.panelTitle }
							onChange={ value => setAttributes( { panelTitle: value } ) }
						/>
						<h3 className="panelbody-title">{ __( 'Active Panel?' ) }</h3>
						<ToggleControl
							label={ __( 'Default / Active' ) }
							help={ __( 'Check to set panel active. Only One panel.' ) }
							checked={ attributes.activeTab }
							onChange={ ( activeTab ) => setAttributes( { activeTab } ) }
						/>
					</PanelBody>
				</InspectorControls>
				<div className={ `tabs-block__item panel ${ attributes.activeTab ? 'active' : '' }` } data-panel={ attributes.panelTitle ? convertToSlug( attributes.panelTitle ) : '' }>
					<InnerBlocks template={ [ [ 'core/paragraph', { content: 'Title' } ] ] } />
				</div>
			</Fragment>
		);
	},

	save: ( { attributes } ) => {
		return (
			<div className={ `tabs-block__item panel ${ attributes.activeTab ? 'active' : '' }` } data-panel={ attributes.panelTitle ? convertToSlug( attributes.panelTitle ) : '' }>
				<InnerBlocks.Content />
			</div>
		);
	},
} );
