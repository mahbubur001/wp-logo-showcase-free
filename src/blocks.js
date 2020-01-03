//  Import CSS.
import './scss/style.scss';
import './scss/editor.scss';

const {__} = wp.i18n;
const {registerBlockType} = wp.blocks;
const {SelectControl} = wp.components;
const {InspectorControls} = wp.editor;

registerBlockType('radiustheme/wplss', {
    title: __('Logo Slider and Showcase', "wp-logo-showcase"),
    icon: 'grid-view',
    description: __('Settings section', "wp-logo-showcase"),
    category: 'common',
    keywords: [
        __('Logo Slider and Showcase', "wp-logo-showcase"),
        __('logo-slider', "wp-logo-showcase")
    ],
    attributes: {
        scId: {
            type: 'number',
            default: 0,
        }
    },
    edit: function (props) {
        let {attributes: {scId}, setAttributes} = props;
        let gridTitle = "";
        let options = [{value: 0, label: __("Select one", "wp-logo-showcase")}];
        if (wplss.short_codes) {
            for (const [id, title] of Object.entries(wplss.short_codes)) {
                options.push({
                    value: id,
                    label: title
                });
                if (scId && Number(id) === scId) {
                    gridTitle = title;
                }
            }
        }
        return (
            [
                <InspectorControls>
                    <SelectControl
                        label={__('Select a shortcode:', "wp-logo-showcase")}
                        options={options}
                        value={scId}
                        onChange={(val) => setAttributes({scId: Number(val)})}
                    />
                </InspectorControls>
                ,
                <div className={props.className}>
                    {!scId ? (
                        <p>{__("Please select a shortcode from block settings", "wp-logo-showcase")}</p>) : (
                        <div>
                            <span><img style={{verticalAlign: 'middle'}} src={wplss.icon}/></span>
                            <span> {__('Logo Slider and Showcase', "wp-logo-showcase")} ( {gridTitle} )</span>
                        </div>
                    )}
                </div>
            ]
        );
    },
    save: function () {
        return null;
    },
});