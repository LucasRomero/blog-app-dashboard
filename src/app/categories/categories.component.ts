import { Component, OnInit, inject } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categoryArray: Array<any> = [];
  formCategory: string = '';
  formStatus: string = 'Add';
  categoryId: string = '';

  private categoriesService = inject(CategoriesService);

  ngOnInit(): void {
    this.categoriesService.loadData().subscribe((val) => {
      this.categoryArray = val;
    });
  }

  onSubmit(formData: any) {
    let categoryData: Category = {
      category: formData.value.category,
    };

    if (this.formCategory == 'Add') {
      this.categoriesService.saveData(categoryData);
    } else if (this.formCategory == 'Edit') {
      this.categoriesService.updateData(this.categoryId, categoryData);
    }

    formData.reset();
    this.formStatus = 'Add';
  }

  onEdit(category: any, id: string): void {
    this.formCategory = category;
    this.formStatus = 'Edit';
    this.categoryId = id;
  }

  onDelete(id: string): void {
    this.categoriesService.deleteData(id);
  }
}
