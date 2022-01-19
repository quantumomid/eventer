import Head from "next/head";

const PageHeadData = ({ title, descriptionMetaContent }) => (
    <Head>
        <title>{ title }</title>
        <meta name="description" content={descriptionMetaContent} />
    </Head>
)

PageHeadData.defaultProps = {
    title: "Next Events",
    descriptionMetaContent: "Collection of a variety of events around the world to help you develop."
}

export default PageHeadData;