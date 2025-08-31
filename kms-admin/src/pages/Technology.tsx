import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Code, Plus, Search, MoreHorizontal, Edit, Trash2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getTechnologies, createTechnology, updateTechnology, deleteTechnology } from "@/services/technologyApi";

export default function Technology() {
  const [technologies, setTechnologies] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingTechnology, setEditingTechnology] = useState<any>(null);
  const [newTechnology, setNewTechnology] = useState({ name: "", image: "" });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // 🔹 Lấy dữ liệu từ API khi load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTechnologies();
        setTechnologies(data.map((t: any) => ({ ...t, image: t.icon })));
      } catch (err) {
        console.error("Failed to fetch technologies:", err);
        toast({
          title: "Error",
          description: "Failed to fetch technologies",
          variant: "destructive",
        });
      }
    };
    fetchData();
  }, [toast]);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>, isEdit: boolean = false) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "Error", description: "Image size must be less than 5MB", variant: "destructive" });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageDataUrl = e.target?.result as string;
      if (isEdit && editingTechnology) setEditingTechnology({ ...editingTechnology, image: imageDataUrl });
      else setNewTechnology({ ...newTechnology, image: imageDataUrl });
    };
    reader.readAsDataURL(file);
  };

  const filteredTechnologies = technologies.filter(tech =>
    tech.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTechnology = async () => {
    if (!newTechnology.name.trim() || !newTechnology.image) {
      toast({
        title: "Error",
        description: !newTechnology.name.trim() ? "Technology name is required" : "Technology image is required",
        variant: "destructive",
      });
      return;
    }

    try {
      const file = fileInputRef.current?.files?.[0];
      if (!file) return alert("Please select an image file.");
      const added = await createTechnology({ name: newTechnology.name.trim(), file });
      setTechnologies([...technologies, { ...added, image: added.icon }]);
      setNewTechnology({ name: "", image: "" });
      setIsAddDialogOpen(false);
      toast({ title: "Success", description: "Technology added successfully" });
    } catch (err) {
      console.error("Add failed:", err);
      toast({ title: "Error", description: "Failed to add technology", variant: "destructive" });
    }
  };

  const handleEditTechnology = async () => {
    if (!editingTechnology?.name.trim()) {
      toast({ title: "Error", description: "Technology name is required", variant: "destructive" });
      return;
    }

    try {
      const file = editFileInputRef.current?.files?.[0];
      const updated = await updateTechnology(editingTechnology.id, { name: editingTechnology.name.trim(), file });
      setTechnologies(technologies.map(t => t.id === updated.id ? { ...updated, image: updated.icon } : t));
      setEditingTechnology(null);
      setIsEditDialogOpen(false);
      toast({ title: "Success", description: "Technology updated successfully" });
    } catch (err) {
      console.error("Update failed:", err);
      toast({ title: "Error", description: "Failed to update technology", variant: "destructive" });
    }
  };

  const handleDeleteTechnology = async (id: number) => {
    try {
      await deleteTechnology(id);
      setTechnologies(technologies.filter(t => t.id !== id));
      toast({ title: "Success", description: "Technology deleted successfully" });
    } catch (err) {
      console.error("Delete failed:", err);
      toast({ title: "Error", description: "Failed to delete technology", variant: "destructive" });
    }
  };

  const startEdit = (technology: any) => {
    setEditingTechnology({ ...technology });
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Technology Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage programming languages and technologies
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="admin-button-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Technology
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Technology</DialogTitle>
              <DialogDescription>
                Add a new technology to your management system.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tech-name">Technology Name</Label>
                <Input
                  id="tech-name"
                  placeholder="e.g., JavaScript, React, Python"
                  value={newTechnology.name}
                  onChange={(e) => setNewTechnology({...newTechnology, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tech-image">Technology Image</Label>
                <div className="flex items-center space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center space-x-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Select Image</span>
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageSelect(e, false)}
                    className="hidden"
                  />
                  {newTechnology.image && (
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-border">
                      <img
                        src={newTechnology.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddTechnology}>Add Technology</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter Bar */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Badge variant="secondary" className="text-sm">
              {filteredTechnologies.length} technologies
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Technologies Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Code className="w-5 h-5 mr-2" />
            Technologies
          </CardTitle>
          <CardDescription>
            Manage your technology stack and programming languages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Icon</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>ID</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTechnologies.map((technology) => (
                <TableRow key={technology.id}>
                <TableCell>
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-border bg-muted">
                      <img
                        src={`http://localhost:3000${technology.image}`}
                        alt={technology.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23999'%3E%3Cpath d='M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z'/%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{technology.name}</TableCell>
                  <TableCell className="text-muted-foreground">#{technology.id}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => startEdit(technology)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteTechnology(technology.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Technology</DialogTitle>
            <DialogDescription>
              Update the technology information.
            </DialogDescription>
          </DialogHeader>
          {editingTechnology && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-tech-name">Technology Name</Label>
                <Input
                  id="edit-tech-name"
                  value={editingTechnology.name}
                  onChange={(e) => setEditingTechnology({...editingTechnology, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-tech-image">Technology Image</Label>
                <div className="flex items-center space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => editFileInputRef.current?.click()}
                    className="flex items-center space-x-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Change Image</span>
                  </Button>
                  <input
                    ref={editFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageSelect(e, true)}
                    className="hidden"
                  />
                  {editingTechnology.image && (
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-border">
                      <img
                        src={editingTechnology.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditTechnology}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}