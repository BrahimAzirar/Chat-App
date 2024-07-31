const GetMembers = async (apiUrl, page) => {
    try {
        const Req_Options = { credentials: 'include' };
        const result = await (await fetch(`${apiUrl}/members/getMembers?page=${page}`, Req_Options)).json();
        if (result.err) throw new Error(result.err);
        return result.response;
    } catch (error) {
        throw new Error(error.message);
    }
};

const GetFriendRequests = async (apiUrl) => {
    try {
        const Req_Options = { credentials: 'include' };
        const result = await (await fetch(`${apiUrl}/friendsRequests/seeFriendsRequests`, Req_Options)).json();
        if (result.err) throw new Error(result.err);
        return result.response;
    } catch (error) {
        throw new Error(error.message);
    }
}

self.onmessage = async (e) => {
    try {
        const { message, API_URL, data } = e.data;

        if (message === "GetMembers") {
            const result = await GetMembers(API_URL, data);
            self.postMessage({ message: "Members", result });
        }
        else if (message === "GetFriendRequests") {
            const result = await GetFriendRequests(API_URL);
            self.postMessage({ message: "FriendRequests", result });
        }
    } catch (error) {
        self.postMessage({ err: error.message });
    }
}