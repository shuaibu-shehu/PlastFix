'use client'

import React, { useState, useRef, useCallback } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Upload, X, RotateCcw } from 'lucide-react'

function extractJsonFromMarkdown(markdownText: string): Record<string, any> {
    try {
        const match = markdownText.match(/```json\n([\s\S]*?)\n```/)
        if (!match) {
            throw new Error("No JSON block found in the Markdown text.")
        }
        const jsonString = match[1]
        return JSON.parse(jsonString)
    } catch (error) {
        if (error instanceof SyntaxError) {
            throw new Error(`Invalid JSON format: ${error.message}`)
        }
        throw error
    }
}

export default function PlasticClassification() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [result, setResult] = useState<Record<string, any> | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [isCameraActive, setIsCameraActive] = useState(false)
    const [cameraPreviewUrl, setCameraPreviewUrl] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0]
            setSelectedFile(file)
            setPreviewUrl(URL.createObjectURL(file))
            setIsCameraActive(false)
            setCameraPreviewUrl(null)
        }
    }

    const startCamera = async () => {
        console.log("starting camera")
        setIsCameraActive(true)
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user' }
            })
            if (videoRef.current) {
                videoRef.current.srcObject = stream
                videoRef.current.play()
            }
        } catch (err) {
            console.error("Error accessing camera:", err)
            setError("Unable to access camera. Please check your permissions.")
        }
    }

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream
            stream.getTracks().forEach(track => track.stop())
            videoRef.current.srcObject = null
        }
        setIsCameraActive(false)
    }

    const capturePhoto = useCallback(() => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current
            const canvas = canvasRef.current
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight
            canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height)

            canvas.toBlob((blob) => {
                if (blob) {
                    const previewUrl = URL.createObjectURL(blob)
                    setCameraPreviewUrl(previewUrl)
                    setIsCameraActive(false)
                }
            }, 'image/jpeg')
        }
    }, [])

    const confirmPhoto = () => {
        if (cameraPreviewUrl) {
            fetch(cameraPreviewUrl)
                .then((res) => res.blob())
                .then((blob) => {
                    const file = new File([blob], 'captured_image.jpg', { type: 'image/jpeg' })
                    setSelectedFile(file)
                    setPreviewUrl(cameraPreviewUrl)
                    setCameraPreviewUrl(null)
                    stopCamera()
                })
        }
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        setLoading(true)
        if (!selectedFile) {
            setError("Please select a file or take a picture before submitting.")
            setLoading(false)
            return
        }

        setError(null)
        setResult(null)

        const formData = new FormData()
        formData.append("image", selectedFile)

        try {
            const response = await axios.post("http://127.0.0.1:8000/classify", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            const res_json = extractJsonFromMarkdown(response.data)
            setResult(res_json)
        } catch (err) {
            setError((err as any).response?.data?.detail || "An error occurred.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="max-w-md mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Plastic Classification</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex flex-col items-center space-y-4">
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                ref={fileInputRef}
                                className="hidden"
                                id="file-upload"
                            />
                            <div className="flex space-x-4">
                                <Button type="button" onClick={() => fileInputRef.current?.click()} variant="outline">
                                    <Upload className="w-4 h-4 mr-2" />
                                    Choose File
                                </Button>
                                <Button type="button" onClick={isCameraActive ? capturePhoto : startCamera} variant="outline">
                                    <Camera className="w-4 h-4 mr-2" />
                                    {isCameraActive ? 'Capture' : 'Take Picture'}
                                </Button>
                            </div>
                            {isCameraActive && (
                                <div className="relative w-full aspect-video">
                                    <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover rounded-lg" />
                                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                        <Button type="button" onClick={capturePhoto} variant="secondary" size="sm">
                                            <Camera className="w-4 h-4 mr-2" />
                                            Capture
                                        </Button>
                                        <Button type="button" variant="secondary" size="sm" onClick={stopCamera}>
                                            <X className="w-4 h-4 mr-2" />
                                            Close Camera
                                        </Button>
                                    </div>
                                </div>
                            )}
                            {cameraPreviewUrl && (
                                <div className="mt-4 relative w-full aspect-video">
                                    <img
                                        src={cameraPreviewUrl}
                                        alt="Camera Preview"
                                        className="rounded-lg object-cover w-full h-full"
                                    />
                                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                        <Button type="button" onClick={confirmPhoto} variant="secondary" size="sm">
                                            Confirm
                                        </Button>
                                        <Button type="button" onClick={() => setCameraPreviewUrl(null)} variant="secondary" size="sm">
                                            Retake
                                        </Button>
                                    </div>
                                </div>
                            )}
                            {previewUrl && !cameraPreviewUrl && (
                                <div className="mt-4 relative w-full aspect-video">
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="rounded-lg object-cover w-full h-full"
                                    />
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        size="sm"
                                        className="absolute bottom-2 right-2"
                                        onClick={() => {
                                            setPreviewUrl(null)
                                            setSelectedFile(null)
                                        }}
                                    >
                                        <RotateCcw className="w-4 h-4 mr-2" />
                                        Retake
                                    </Button>
                                </div>
                            )}
                            {selectedFile && (
                                <p className="text-sm text-muted-foreground">
                                    Selected: {selectedFile.name}
                                </p>
                            )}
                        </div>
                        <Button type="submit" className="w-full" disabled={loading || isCameraActive || !!cameraPreviewUrl}>
                            {loading ? "Classifying..." : "Classify Plastic"}
                        </Button>
                    </form>

                    {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

                    {result && (
                        <div className="mt-6 space-y-2 bg-muted p-4 rounded-lg">
                            <h2 className="text-xl font-semibold">Classification Result:</h2>
                            <p className="text-lg font-medium">{result.category}</p>
                            <p className="text-muted-foreground">{result.suggestion}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
            <canvas ref={canvasRef} className="hidden" />
        </div>
    )
}

