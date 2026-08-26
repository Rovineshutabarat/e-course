"use client";

import MuxPlayer from "@mux/mux-player-react";

const Page = () => {
    return (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <MuxPlayer
                streamType="on-demand"

                src="http://localhost:4000/api/uploads/stream/736ff7c5-e67b-4a10-9f43-6f98f8cc456f/master.m3u8"
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