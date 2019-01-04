import { Component, OnInit, Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { hideEditDialogActionCreator } from '../actions';
import { IAppState } from '../store-settings/store-types';
import { BehaviorSubject } from 'rxjs';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material';
import { FourTreeNodeType, FourTree, createFourTreeNode } from 'src/data-structures/four-tree';

/**
 * Json node data with nested structure. Each node has a filename and a value or a list of children
 */
// export class FileNode {
//   children: FileNode[];
//   filename: string;
//   type: any;
// }

// /**
//  * The Json tree data in string. The data could be parsed into Json object
//  */
// const TREE_DATA = JSON.stringify({
//   Applications: {
//     Calendar: 'app',
//     Chrome: 'app',
//     Webstorm: 'app'
//   },
//   Documents: {
//     angular: {
//       src: {
//         compiler: 'ts',
//         core: 'ts'
//       }
//     },
//     material2: {
//       src: {
//         button: 'ts',
//         checkbox: 'ts',
//         input: 'ts'
//       }
//     }
//   },
//   Downloads: {
//     October: 'pdf',
//     November: 'pdf',
//     Tutorial: 'html'
//   },
//   Pictures: {
//     'Photo Booth Library': {
//       Contents: 'dir',
//       Pictures: 'dir'
//     },
//     Sun: 'png',
//     Woods: 'jpg'
//   }
// });

// /**
//  * File database, it can build a tree structured Json object from string.
//  * Each node in Json object represents a file or a directory. For a file, it has filename and type.
//  * For a directory, it has filename and children (a list of files or directories).
//  * The input will be a json object string, and the output is a list of `FileNode` with nested
//  * structure.
//  */
// @Injectable()
// export class FileDatabase {
//   dataChange = new BehaviorSubject<FileNode[]>([]);

//   get data(): FileNode[] { return this.dataChange.value; }

//   constructor() {
//     this.initialize();
//   }

//   initialize() {
//     // Parse the string to json object.
//     const dataObject = JSON.parse(TREE_DATA);

//     // Build the tree nodes from Json object. The result is a list of `FileNode` with nested
//     //     file node as children.
//     const data = this.buildFileTree(dataObject, 0);

//     // Notify the change.
//     this.dataChange.next(data);
//   }

//   /**
//    * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
//    * The return value is the list of `FileNode`.
//    */
//   buildFileTree(obj: {[key: string]: any}, level: number): FileNode[] {
//     return Object.keys(obj).reduce<FileNode[]>((accumulator, key) => {
//       const value = obj[key];
//       const node = new FileNode();
//       node.filename = key;

//       if (value != null) {
//         if (typeof value === 'object') {
//           node.children = this.buildFileTree(value, level + 1);
//         } else {
//           node.type = value;
//         }
//       }

//       return accumulator.concat(node);
//     }, []);
//   }
// }

// @Component({
//   selector: 'app-dialog-editor',
//   templateUrl: './dialog-editor.component.html',
//   styleUrls: ['./dialog-editor.component.css'],
//   providers: [FileDatabase]
// })
// export class DialogEditorComponent implements OnInit {
//   nestedTreeControl: NestedTreeControl<FileNode>;
//   nestedDataSource: MatTreeNestedDataSource<FileNode>;

//   constructor(database: FileDatabase, private ngRedux: NgRedux<IAppState>) {
//     this.nestedTreeControl = new NestedTreeControl<FileNode>(this._getChildren);
//     this.nestedDataSource = new MatTreeNestedDataSource();

//     database.dataChange.subscribe(data => this.nestedDataSource.data = data);
//   }

//   ngOnInit() {
//   }

//   close() {
//     this.ngRedux.dispatch(hideEditDialogActionCreator());
//   }

//   hasNestedChild = (_: number, nodeData: FileNode) => !nodeData.type;

//   private _getChildren = (node: FileNode) => node.children;

// }

@Component({
  selector: 'app-dialog-editor',
  templateUrl: './dialog-editor.component.html',
  styleUrls: ['./dialog-editor.component.css']
})
export class DialogEditorComponent implements OnInit {
  dataTree: FourTree;
  nestedTreeControl: NestedTreeControl<FourTreeNodeType>;
  nestedDataSource: MatTreeNestedDataSource<FourTreeNodeType>;

  constructor(private ngRedux: NgRedux<IAppState>) {
    this.nestedTreeControl = new NestedTreeControl<FourTreeNodeType>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();
    this.dataTree = new FourTree();
    this.dataTree.add(0, createFourTreeNode('hi', 'groovy', true, 'Mortimore'));

    this.nestedDataSource.data = [ this.dataTree.get(0) ];
  }

  ngOnInit() {
  }

  close() {
    this.ngRedux.dispatch(hideEditDialogActionCreator());
  }

  hasNestedChild = (_: number, node: FourTreeNodeType) => this.dataTree.hasChildNodes(node);

  private _getChildren = (node: FourTreeNodeType) => this.dataTree.getChildNodes(node);
}
