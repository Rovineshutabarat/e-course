"use client";

import MuxPlayer from "@mux/mux-player-react";

const Page = () => {
    return (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <MuxPlayer
                streamType="on-demand"

                src="http://localhost:4000/api/uploads/stream/0d2e12d3-1095-4bc7-976b-c4bb030cf378/master.m3u8"
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