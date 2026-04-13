"use client";

import MuxPlayer from "@mux/mux-player-react";

const Page = () => {
    return (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <MuxPlayer
                streamType="on-demand"

                src="http://localhost:4000/api/uploads/stream/e0f671bd-36d8-4810-9b7c-c65a7a4c4a1b/master.m3u8"
                primaryColor="#ffa31a"
                // secondaryColor="#000000"
                accentColor="#FFFFFF"
                title="Video Preview"
                defaultStreamType="on-demand"

                poster="/thumbnail.jpg"
                preload="auto"
            />
        </div>
    )
}

export default Page