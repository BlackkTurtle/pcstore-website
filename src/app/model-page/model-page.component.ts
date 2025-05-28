import { Component } from '@angular/core';
import { ModelService } from '../services/model.service';
import { ProductWithRating } from '../DTOs/ProductWithRatingDTO.interface';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-model-page',
  templateUrl: './model-page.component.html',
  styleUrls: ['./model-page.component.css']
})
export class ModelPageComponent {
  selectedFile: File | null = null;
  filePreview: string | null = null;  // Property to store the preview URL

  uploaderror: boolean = false;
  recommendedProducts: ProductWithRating[] = [];

  constructor(private modelService: ModelService,
    private productService: ProductService
  ) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.createFilePreview(this.selectedFile); // Create preview for selected file
      this.uploadFile();
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const dropZone = document.querySelector('.drop-zone');
    if (dropZone) dropZone.classList.add('dragover');
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const dropZone = document.querySelector('.drop-zone');
    if (dropZone) dropZone.classList.remove('dragover');
  }

  onFileDropped(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const dropZone = document.querySelector('.drop-zone');
    if (dropZone) dropZone.classList.remove('dragover');

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.selectedFile = event.dataTransfer.files[0];
      this.createFilePreview(this.selectedFile); // Create preview for dropped file
      this.uploadFile();
      event.dataTransfer.clearData();
    }
  }

  createFilePreview(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.filePreview = e.target.result; // Set the preview URL
    };
    reader.readAsDataURL(file);
  }

  uploadFile(): void {
    if (this.selectedFile) {
      this.modelService.uploadImage(this.selectedFile).subscribe(
        (response: any) => {
          console.log('Upload success:', response);
  
          if (response.result && response.data.length > 0) {
            const productIds = response.data.map((item: any) => item.productId);
            this.fetchRecommendedProducts(productIds);
            this.uploaderror = false;
          } else {
            console.log(response);
            this.uploaderror = true;
          }
        },
        (error) => {
          console.error('Upload error:', error);
        }
      );
    }
  }

  fetchRecommendedProducts(ids: number[]): void {
    this.productService.getMultipleProductsByIds(ids).subscribe(
      (products) => {
        this.recommendedProducts = products;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
}
