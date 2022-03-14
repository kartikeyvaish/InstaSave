// Packages Imports
import env from "../config/config";
import { OwnerProps, PostCardProps, PostProps } from "../types/ComponentTypes";

// function to get post fetch url
export const get_post_fetcher_url = (url: string) => {
    let BaseURL = env.BaseURL ?? "";

    let flushed_string = url.replace(BaseURL, "");

    let endpoint = flushed_string.split("/")[0] + "/" + flushed_string.split("/")[1] + (env.suffix ?? "");

    return BaseURL + endpoint;
}

// function to get post details
export const get_post_details = async (url: string) => {
    try {
        const apiResponse = await fetch(get_post_fetcher_url(url), {
            method: "GET",
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.3",
            }
        }).then(res => res.json());

        if (apiResponse)
            return apiResponse;

        const postReq = await get_post_details_postReq(url).then(res => res.json());

        if (postReq)
            return postReq;

        return null;
    } catch (error) {
        return null;
    }
}

// function to get post details
export const get_post_details_postReq = async (url: string) => {
    try {
        const apiResponse = await fetch(get_post_fetcher_url(url), {
            method: "POST",
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.3",
            }
        }).then(res => res.json());

        if (apiResponse)
            return apiResponse;

        return null;
    } catch (error) {
        return null;
    }
}

// function to return username and join all other usernames
export const get_username = (username?: string, other?: Array<OwnerProps>) => {
    return username +
        (other?.length
            ? " & " + other?.map((producer: OwnerProps) => producer.username).join(", ")
            : "");
}

// get image item from node
export const get_image_post_item = (node: any) => {
    return {
        id: node.id,
        uri: node.display_url,
        is_video: false,
    }
}

// get video item from node
export const get_video_post_item = (node: any) => {
    return {
        id: node.id,
        uri: node.video_url,
        is_video: true,
        thumbnail_image: node.display_url,
    }
}

// fetch post details
export const GetPostDetailsAPI = async (uri: string) => {
    try {
        const response = await get_post_details(get_post_fetcher_url(uri));

        const postData = response?.graphql?.shortcode_media;

        if (!postData) return null;

        if (response) {
            const id: string = postData.id;

            const owner: OwnerProps = {
                full_name: postData.owner.full_name,
                id: postData.owner.id,
                is_private: postData.is_private,
                is_verified: postData.owner.is_verified,
                profile_pic_url: postData.owner.profile_pic_url,
                username: postData.owner.username,
            };

            const coauthor_producers: Array<OwnerProps> = postData.coauthor_producers || [];
            const location: string = postData.location?.name;

            const posts: Array<PostProps> = [];

            // Image Node contains a image
            if (postData.__typename === "GraphImage") {
                posts.push(get_image_post_item(postData));
            }
            // If Node contains a Video
            else if (postData.__typename === "GraphVideo") {
                posts.push(get_video_post_item(postData));
            }
            // If Node contains a Video and IMages both
            else if (postData.__typename === "GraphSidecar") {
                postData.edge_sidecar_to_children.edges.forEach((edge: any) => {
                    const node: any = edge.node;
                    // If node exists, then take out the image or videos
                    if (node) {
                        if (node.__typename === "GraphImage") {
                            posts.push(get_image_post_item(node));
                        } else if (node.__typename === "GraphVideo") {
                            posts.push(get_video_post_item(node));
                        }
                    }
                });
            }

            const payload: PostCardProps = {
                id,
                owner,
                coauthor_producers,
                location,
                posts,
            };

            return payload;
        }
    } catch (error) {
        return null
    }
};