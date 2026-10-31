// "use client";


// import {
//     AlertCircle,
//     ChevronDown,
//     ChevronRight,
//     ChevronUp,
//     Film,
//     GripVertical,
//     Paperclip,
//     Pencil,
//     Plus,
//     Trash2,
//     Upload,
//     X
// } from "lucide-react";

// import { 
//     Tabs, 
//     TabsContent, 
//     TabsList, 
//     TabsTrigger 
// } from "@/components/ui/tabs";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Separator } from "@/components/ui/separator";
// import { cn } from "@/lib/utils";
// import React from "react";
// import z from "zod/v3";

// type Resource = {
//     id: number
//     title: string
//     orderNumber: number
// }

// type Module = {
//     id: number
//     title: string
//     orderNumber: number
//     resource?: Resource[]
// }

// const contents: Module[] = [
//     {
//         id: 1,
//         title: "Module 1",
//         orderNumber: 1,
//         resource: [
//             {
//                 id: 1,
//                 title: "Resource 1",
//                 orderNumber: 1
//             }
//         ]
//     },
//     {
//         id: 2,
//         title: "Module 2",
//         orderNumber: 1,
//         resource: [
//             {
//                 id: 2,
//                 title: "Resource 2",
//                 orderNumber: 1
//             }
//         ]
//     }
// ]

// const ResourceRequest = z.object({
//     title: z.string(),
//     orderNumber: z.number()
// })

// const ModuleRequest = z.object({
//     title: z.string(),
//     orderNumber: z.number(),
//     resources: z.array(ResourceRequest)
// })

// type ModuleRequest = z.infer<typeof ModuleRequest>
// type ResourceRequest = z.infer<typeof ResourceRequest>

// const ContentEditorSplitPanel = () => {
//     const [activeModuleIds, setActiveModuleIds] = React.useState<number[]>([])
//     const [selectedResourceId, setSelectedResourceId] = React.useState<number | null>(null)
//     const [modules, setModules] = React.useState<Module[]>(contents)

//     const toggleModule = (moduleId: number) => {
//         setActiveModuleIds((prev) =>
//             prev.includes(moduleId)
//                 ? prev.filter((id) => id !== moduleId)
//                 : [...prev, moduleId]
//         )
//     }

//     function handleDeleteModule(id: number) {
//         setModules((prev) => prev.filter((m) => m.id !== id))
//     }

//     return (
//         <div className="flex h-[calc(100vh-80px)] overflow-hidden rounded-lg border bg-background">
//             <div className="w-[300px] shrink-0 flex flex-col border-r overflow-y-auto">
//                 <div className="flex items-center justify-between px-4 py-3 border-b sticky top-0 bg-background z-10">
//                     <p className="text-sm font-semibold">Course Content</p>
//                     <Button variant="ghost" size="icon" className="h-7 w-7">
//                         <Plus className="h-4 w-4" />
//                     </Button>
//                 </div>

//                 <div className="flex flex-col p-2 gap-1">
//                     {modules.map((module) => (
//                         <div key={module.id} className="flex flex-col rounded-md">
//                             <div className="group flex items-center gap-1.5 rounded-md px-2 py-2 hover:bg-muted/50" onClick={() => toggleModule(module.id)}>
//                                 <GripVertical className="h-4 w-4 text-muted-foreground shrink-0 cursor-grab" />
//                                 <button className="flex items-center gap-1.5 flex-1 min-w-0 text-left">

//                                     <span className="text-xs font-semibold truncate">
//                                         {module.title}
//                                     </span>
//                                 </button>
//                                 <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 shrink-0">
//                                     <button className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground">
//                                         <Pencil className="h-3 w-3" />
//                                     </button>
//                                     <button className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-red-500" onClick={() => handleDeleteModule(module.id)}>
//                                         <Trash2 className="h-3 w-3" />
//                                     </button>
//                                     <button className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground">
//                                         <Plus className="h-3 w-3" />
//                                     </button>
//                                 </div>
//                                 {activeModuleIds.includes(module.id) ? <ChevronUp className="h-3.5 w-3.5 text-muted-foreground shrink-0" /> : <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />}
//                             </div>

//                             <div className="ml-6 flex flex-col gap-0.5 my-1">
//                                 {activeModuleIds.includes(module.id) && module.resource?.map((resource: Resource) => (
//                                     <div
//                                         key={resource.id}
//                                         className={cn("group flex items-center gap-1.5 rounded-md px-2 py-2 cursor-pointer",
//                                             selectedResourceId === resource.id && "bg-primary/10")}
//                                         onClick={() => setSelectedResourceId(resource.id)}
//                                     >
//                                         <GripVertical className="h-3.5 w-3.5 text-muted-foreground shrink-0 cursor-grab" />
//                                         <Film className="h-3.5 w-3.5 shrink-0 text-primary" />
//                                         <span className="text-xs flex-1 truncate font-medium text-primary">
//                                             {resource.title}
//                                         </span>
//                                         <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 shrink-0">
//                                             <button className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground">
//                                                 <Pencil className="h-3 w-3" />
//                                             </button>
//                                             <button className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-red-500">
//                                                 <Trash2 className="h-3 w-3" />
//                                             </button>
//                                             <button className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground">
//                                                 <Plus className="h-3 w-3" />
//                                             </button>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <div className="flex-1 overflow-y-auto">
//             <div className="flex flex-col h-full">
//                 {/* Header Section */}
//                 <div className="flex items-center justify-between px-6 py-3 border-b sticky top-0 bg-background z-10">
//                     <div className="flex items-center gap-2">
//                         <span className="text-xs text-muted-foreground">Getting Started</span>
//                         <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
//                         <span className="text-xs font-medium">Introduction</span>
//                         <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
//                             activeTab === "video" 
//                             ? "bg-blue-500/10 text-blue-600" 
//                             : "bg-orange-500/10 text-orange-600"
//                         }`}>
//                             {activeTab}
//                         </span>
//                     </div>
//                     <Button size="sm">Save Changes</Button>
//                 </div>

//                 <div className="flex flex-col gap-6 px-6 py-6">
//                     {/* Common Field: Title */}
//                     <div className="flex flex-col gap-1.5">
//                         <Label htmlFor="title">Lesson Title</Label>
//                         <Input id="title" defaultValue="Introduction" placeholder="Enter lesson title..." />
//                     </div>

//                     {/* Shadcn Tabs Section */}
//                     <Tabs defaultValue="video" value={activeTab} onValueChange={setActiveTab} className="w-full">
//                         <div className="flex flex-col gap-1.5 mb-4">
//                             <Label>Lesson Type</Label>
//                             <TabsList className="grid w-[300px] grid-cols-2">
//                                 <TabsTrigger value="video" className="flex items-center gap-2">
//                                     <Film className="h-3.5 w-3.5" />
//                                     Video
//                                 </TabsTrigger>
//                                 <TabsTrigger value="resource" className="flex items-center gap-2">
//                                     <Paperclip className="h-3.5 w-3.5" />
//                                     Resource
//                                 </TabsTrigger>
//                             </TabsList>
//                         </div>

//                         {/* Video Tab Content */}
//                         <TabsContent value="video" className="space-y-6 mt-0">
//                             <div className="flex flex-col gap-1.5">
//                                 <Label>Video File</Label>
//                                 <div className="rounded-lg border border-dashed px-4 py-12 flex flex-col items-center gap-2 text-center cursor-pointer hover:bg-muted/30 transition-colors">
//                                     <div className="p-3 rounded-full bg-primary/5">
//                                         <Upload className="h-6 w-6 text-primary" />
//                                     </div>
//                                     <p className="text-sm font-medium">Click to upload video</p>
//                                     <p className="text-xs text-muted-foreground">MP4, MOV, AVI — max 2GB</p>
//                                 </div>
//                             </div>
//                         </TabsContent>

//                         {/* Resource Tab Content */}
//                         <TabsContent value="resource" className="space-y-6 mt-0">
//                             <div className="flex flex-col gap-1.5">
//                                 <Label>Resource Content</Label>
//                                 <div className="rounded-lg border border-dashed px-4 py-12 flex flex-col items-center gap-2 text-center cursor-pointer hover:bg-muted/30 transition-colors">
//                                     <div className="p-3 rounded-full bg-primary/5">
//                                         <Paperclip className="h-6 w-6 text-primary" />
//                                     </div>
//                                     <p className="text-sm font-medium">Add PDF or Documentation</p>
//                                     <p className="text-xs text-muted-foreground">Students can read this directly</p>
//                                 </div>
//                             </div>
//                         </TabsContent>
//                     </Tabs>

//                     <Separator />

//                     {/* Attachments Section (Always visible or conditional) */}
//                     <div className="flex flex-col gap-3">
//                         <div className="flex items-center justify-between">
//                             <div>
//                                 <p className="text-sm font-medium">Additional Attachments</p>
//                                 <p className="text-xs text-muted-foreground mt-0.5">
//                                     Support files like slides, starter kits, or cheat sheets.
//                                 </p>
//                             </div>
//                             <Button variant="outline" size="sm">
//                                 <Upload className="h-3.5 w-3.5 mr-1.5" />
//                                 Upload File
//                             </Button>
//                         </div>

//                         {activeTab === "video" && (
//                             <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-500/10 px-3 py-2 rounded-lg">
//                                 <AlertCircle className="h-3.5 w-3.5 shrink-0" />
//                                 <span>Note: Video lessons can have multiple file attachments.</span>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//         </div>
//     );
// };

// export default ContentEditorSplitPanel;

const CourseContentPage = () => {
  return null;
};

export default CourseContentPage;