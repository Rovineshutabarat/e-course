"use client"

import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import Image from "next/image"
import { Fragment, useState } from "react"
import { createPortal } from "react-dom"

interface ImageViewerProps {
    src: string
    alt: string
    height?: number
    width?: number
}

export const ImageViewer = ({ src, alt, height = 80, width }: ImageViewerProps) => {
    const [open, setOpen] = useState(false)

    return (
        <Fragment>
            <div
                className="relative w-full h-20 rounded overflow-hidden cursor-pointer"
                onClick={() => setOpen(true)}
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className={cn(`object-cover transition-transform duration-300 hover:scale-105 h-${height}`,
                        width ? `w-${width}` : 'w-full')}
                />
            </div>

            {open && createPortal(
                <div
                    className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center"
                    onClick={() => setOpen(false)}
                >
                    <button
                        className="absolute top-4 right-4 rounded-full bg-white/10 hover:bg-white/20 p-2 transition"
                        onClick={() => setOpen(false)}
                    >
                        <X className="h-5 w-5 text-white" />
                    </button>

                    <div
                        className="relative w-[95vw] h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={src}
                            alt={alt}
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>,
                document.body
            )}
        </Fragment>
    )
}