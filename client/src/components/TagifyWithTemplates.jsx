import React, {useState, useEffect, useCallback, useRef, useMemo} from 'react'
//import Tags from './tagify/react.tagify'
//import Tags from "@yaireo/tagify/dist/react.tagify"
import Tags from '@yaireo/tagify/dist/react.tagify'
import "@yaireo/tagify/dist/tagify.css" // Tagify CSS

function suggestionItemTemplate(tagData) {
    return `
        <div ${this.getAttributes(tagData)}
            class='tagify__dropdown__item d-flex align-items-center ${tagData.class ? tagData.class : ""}'
            tabindex="0"
            role="option">
            <div class="d-flex flex-column">
                <strong>${tagData.name} ${tagData.surname}</strong>
                <span>${tagData.email}</span>
            </div>
        </div>
    `
}
function tagTemplate(tagData) {
    return `
        <tag title="${(tagData.title || tagData.email)}"
                contenteditable='false'
                spellcheck='false'
                tabIndex="-1"
                class="${this.settings.classNames.tag} ${tagData.class ? tagData.class : ""}"
                ${this.getAttributes(tagData)}>
            <x title='' class='tagify__tag__removeBtn' role='button' aria-label='remove tag'></x>
            <div class="d-flex align-items-center">
                <span class='tagify__tag-text'>${tagData.name}</span>
            </div>
        </tag>
    `}

const TagifyWithTemplates = (props) => {
    console.log( props.users.map(({ _id,name,surname,email}) => ({value: _id, name:name,surname:surname,email:email})))
    return (
            <Tags
                settings={{
                    tagTextProp: 'name',
                    dropdown: {
                        closeOnSelect: false,
                        enabled: 0,
                        searchKeys: ['name', 'email']
                    },
                    templates: {
                        tag: tagTemplate,
                        dropdownItem: suggestionItemTemplate

                    },
                    whitelist: props.users.map(({ _id,name,surname,email}) => ({value: _id, name:name,surname:surname,email:email}))
                }}
                defaultValue={props.authorizedUsers.map(({ _id,name}) => ({value: _id, name:name}))}
                autoFocus={true}
            />
    )
}

export default TagifyWithTemplates