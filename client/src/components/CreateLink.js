import React from 'react';
import { useForm } from 'react-hook-form';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo';
import { useHistory } from 'react-router-dom';

const CREATE_LINK = gql`
    mutation CreateLink($url: String!, $description: String!) {
        createLink(description: $description, url: $url) {
            url
            description
        }
    }
`

const CreateLink = () => {
    const history = useHistory();
    const { handleSubmit, register, errors } = useForm();
    const [createLink, { data }] = useMutation(CREATE_LINK);

    const onSubmit = async values => {
        await createLink({ variables: { url: values.url, description: values.description } })
        history.push('/')
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column mt3">
            <label>
                <h3>Enter a new URL</h3>
            </label>
            <input
                className="mb2"
                name="url"
                ref={register({
                    required: 'You must provide url address'
                })}
            />
            {errors.url && errors.url.message}

            <label>
                <h3>Enter a new Description</h3>
            </label>
            <input
                className="mb2"
                name="description"
                ref={register({
                    required: 'You must provide description'
                })}
            />
            {errors.description && errors.description.message}

            <button type="submit">Submit</button>
        </form>
    )
}

export default CreateLink;