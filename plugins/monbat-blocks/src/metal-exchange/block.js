/**
 * BLOCK: Metal Exchange Item
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';
import './parent';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls } = wp.blockEditor;
const { PanelBody, SelectControl } = wp.components;
const { Fragment } = wp.element;

const TEMPLATE = [ [ 'core/columns', { columns: 3 }, [
	[ 'core/column', { width: '25%', className: 'first-column' }, [
		[ 'core/paragraph', {} ],
	] ],
	[ 'core/column', { width: '50%', className: 'second-column' }, [
		[ 'core/image', { align: 'center' } ],
	] ],
	[ 'core/column', { width: '25%', className: 'third-column' }, [
		[ 'core/paragraph', {} ],
	] ],
] ] ];

registerBlockType( 'cgb/metal-exchange-item', {
	title: __( 'Metal Exchange Item' ),
	icon: 'slides',
	category: 'monbat-blocks',
	parent: [ 'cgb/metal-exchange' ],
	attributes: {
		position: {
			type: 'string',
			default: 'bottom',
		},
	},
	keywords: [
		__( 'monbat' ),
		__( 'animation' ),
		__( 'metal' ),
		__( 'exchange' ),
	],

	edit: ( { attributes, setAttributes } ) => {
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Slide Active Button' ) }>
						<SelectControl
							label="Position"
							value={ attributes.position }
							options={ [
								{ label: 'Bottom', value: 'bottom' },
								{ label: 'Top', value: 'top' },
								{ label: 'Left', value: 'left' },
								{ label: 'Right', value: 'right' },
							] }
							onChange={ ( position ) => setAttributes( { position } ) }
						/>
					</PanelBody>
				</InspectorControls>
				<div className={ 'metal-exchange__item' } data-id={ `active-${ attributes.position }` }>
					<InnerBlocks template={ TEMPLATE } allowedBlocks={ [ 'core/columns', 'core/column', 'core/paragraph', 'core/heading' ] } />
				</div>
			</Fragment>
		);
	},

	save: ( { attributes } ) => {
		return (
			<div className={ 'metal-exchange__item' } data-id={ `active-${ attributes.position }` }>
				<InnerBlocks.Content />
			</div>
		);
	},
} );
