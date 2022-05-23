import React, {useState, useEffect, useCallback, useRef, useMemo} from 'react'
import Tags from '@yaireo/tagify/dist/react.tagify'
import "@yaireo/tagify/dist/tagify.css"
import axios from "../axios";
import {useParams} from "react-router-dom"; // Tagify CSS

function suggestionItemTemplate(tagData) {
    return `
        <div ${this.getAttributes(tagData)}
            class='tagify__dropdown__item d-flex align-items-center ${tagData.class ? tagData.class : ""}'
            tabindex="0"
            role="option">
            <div class="d-flex flex-column text-dark">
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
    const tagifyRef1 = useRef()
    const { id } = useParams()
    const [error, setError] = useState("");

    const updateAuthorizedUsers = useCallback((e) => {
        console.log("CHANGED:", e.detail.tagify.getCleanValue())
        let authorized = e.detail.tagify.getCleanValue()
        let authorizedIDs = authorized.map(({value}) => value )

        axios
            .put( `/box/${id}/authorize`, {authorized: authorizedIDs})
            .then((resp) => {
                setError("");
                console.log("Uspesno posodobljen array");
            })
            .catch((err) => {
                setError(err.response.data.message);
            });

    }, [])
    return (
            <Tags
                tagifyRef={tagifyRef1}
                onChange={updateAuthorizedUsers}
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
                    whitelist: props.users.map(({ _id,name,surname,email}) => ({value: _id, name:name,surname:surname,email:email})),
                    enforceWhitelist: true
                }}
                defaultValue={props.authorizedUsers.map(({ _id,name}) => ({value: _id, name:name}))}
                autoFocus={true}
            />
    )
}

export default TagifyWithTemplates