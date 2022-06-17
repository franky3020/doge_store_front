import * as React from 'react';
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'

import markdown from "./StoreIntroducePage_markdown";
import AppNavbar from '../component/AppNavbar';
import { Container } from 'react-bootstrap';


export interface IStoreIntroducePageProps {
}

export interface IStoreIntroducePageState {
}

export default class StoreIntroducePage extends React.Component<IStoreIntroducePageProps, IStoreIntroducePageState> {
    constructor(props: IStoreIntroducePageProps) {
        super(props);

        this.state = {
        }


    }


    public render() {

        return (
            <React.Fragment>


                <AppNavbar />
                <Container>
                    <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />
                </Container>
            </React.Fragment>
        );
    }
}
