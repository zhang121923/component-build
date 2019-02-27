import {AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {forEach} from '@angular/router/src/utils/collection';
import {Surface, Path, Text, Group, Circle, geometry, exportPDF} from '@progress/kendo-drawing';
import {Point, transform} from '@progress/kendo-drawing/geometry';
import {LineCap} from '@progress/kendo-drawing/dist/npm/shapes/shape';
import {GridComponent} from '@progress/kendo-angular-grid';
import * as _ from 'lodash';
import {saveAs} from '@progress/kendo-file-saver';
import {PDFOptions} from '@progress/kendo-drawing/pdf';
import * as $ from 'jquery';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit, AfterViewInit {

  @ViewChild('multiGrid') public multiGrid: ElementRef;
  @ViewChild('channelSceneGrid1') public gridElement: ElementRef;
  @ViewChild('channelSceneGrid2') public gridElement2: ElementRef;
  @ViewChildren(GridComponent) public grids: QueryList<GridComponent>;
  public infoData: Array<any>;
  public channelData: Array<any>;

  constructor() {
    this.infoData = [
      {field: 'a', name: '万泉街道'},
      {field: 'b', name: '文官街道'},
      {field: 'c', name: '二台子街道'},
      {field: 'd', name: '金街街道'},
      {field: 'd', name: '金街街道'},
      {field: 'd', name: '金街街道'},
      {field: 'd', name: '金街街道'},
      {field: 'd', name: '金街街道'},
      {field: 'd', name: '金街街道'}
    ];
    this.channelData = [
      {
        id: '入1/CE1(196.0500THz-1529.16nm)',
        items: [
          {start: 0, end: 1, msg: '10G(空闲10G)', direction: 2, useRate: 0.3},
          {start: 1, end: 2, msg: '10G(空闲10G)', direction: 0, useRate: 0.6, next: '123沈阳北'},
          {start: 2, end: 4, msg: '10G(空闲10G)', direction: 1, useRate: 0.6, next: '123沈阳北'},
          {start: 5, end: 7, msg: '10G(空闲10G)', direction: 0, useRate: 0.6, next: '123沈阳北'},
          {start: 7, end: 8, msg: '10G(空闲10G)', direction: 1, useRate: 0.6, next: '123沈阳北'}
        ]
      },
      {
        id: '入2/CE1(196.0500THz-1529.16nm)',
        items: [
          {start: 1, end: 3, msg: '10G(空闲10G)', direction: 2, useRate: 0.8}
        ]
      }
    ];
  }

  ngOnInit() {
  }


  ngAfterViewInit() {
    // this.drawScene0();
    this.drawScene1();
  }

  public export(): void {
    const element = document.querySelector('#multiGrid');
    const grid2 = document.querySelector('#grid2');
    html2canvas(grid2, {
      logging: false
    }).then(canvas => {
      $.ajax({
        url: canvas.toDataURL(),
        type: 'GET',
        xhrFields: {
          responseType: 'blob'
        },
        dataType: 'binary',
        success: (data) => {
          const blob = new Blob([data], {type: 'application/octet-stream'});
          // 兼容IE浏览器
          if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, 'test.jpg');
          } else {
            // 火狐、chrome浏览器通过a标签进行下载
            const a = document.createElement('a');
            a.id = 'exppub';
            // 保证pdf和html文件不在浏览器中打开，而是下载
            a.download = 'test.jpg';
            a.href = URL.createObjectURL(blob);
            document.body.appendChild(a);
            const aLink = document.getElementById('exppub');
            aLink.click();
            aLink.parentNode.removeChild(a);
          }
        }
      });
    });
    // const ele = element.toString();
    // const temp = 'data:image/svg+xml<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\'>' + ele + '</svg>';
    // const img = new Image();
    // img.src = temp;
    // const canvas = document.createElement('canvas');
    // const ctx = canvas.getContext('2d');
    // img.crossOrigin = 'anonymous';
    // ctx.drawImage(img, 0, 0);
    // const canvasbase = canvas.toDataURL();
    // $.ajax({
    //   url: canvasbase,
    //   type: 'GET',
    //   xhrFields: {
    //     responseType: 'blob'
    //   },
    //   dataType: 'binary',
    //   success: (data) => {
    //     const blob = new Blob([data], {type: 'application/octet-stream'});
    //     // 兼容IE浏览器
    //     if (window.navigator.msSaveOrOpenBlob) {
    //       window.navigator.msSaveOrOpenBlob(blob, 'test.png');
    //     } else {
    //       // 火狐、chrome浏览器通过a标签进行下载
    //       const a = document.createElement('a');
    //       a.id = 'exppub';
    //       // 保证pdf和html文件不在浏览器中打开，而是下载
    //       a.download = 'test.png';
    //       a.href = URL.createObjectURL(blob);
    //       document.body.appendChild(a);
    //       const aLink = document.getElementById('exppub');
    //       aLink.click();
    //       aLink.parentNode.removeChild(a);
    //     }
    //   }
    // });
    // window.saveAs(canvasbase, 'test.png');
  }

  public rowToggle(e, gridIndex): void {
    const index = e.index;
    let gridEle = gridIndex === 0 ? this.gridElement['ariaRoot'].nativeElement : this.gridElement2['ariaRoot'].nativeElement;
    let allRow = gridEle.querySelectorAll('tr');
    let currentRow = allRow[index + 1];
    const detailBtn = currentRow.querySelector('.k-icon');
    const clickEvent = new MouseEvent('click', {
      'view': window,
      'bubbles': true,
      'cancelable': false
    });
    detailBtn.dispatchEvent(clickEvent);
    gridEle = null;
    allRow = null;
    currentRow = null;
  }

  // public exportClick(): void {
  //   const promises = this.grids.map((grid) => {
  //     grid.drawPDF();
  //   });
  //   Promise.all(promises).then(groups => {
  //     const rootGroup = new Group({
  //       pdf: {
  //         multiPage: true
  //       }
  //     });
  //     groups.forEach(group => {
  //       rootGroup.append(...group.children);
  //     });
  //
  //     return exportPDF(rootGroup, {
  //       paperSize: 'A4'
  //     });
  //   }).then(dataUri => {
  //     saveAs(dataUri, 'allTest.pdf');
  //   });
  // }

  // private drawScene0(): void {
  //   let gridEle = this.gridElement['ariaRoot'].nativeElement;
  //   let allRow = gridEle.querySelectorAll('tr');
  //   const contentRow = Array.prototype.slice.call(allRow, 1);
  //   for (const tr of contentRow) {
  //     const width = tr.clientWidth;
  //     const height = tr.clientHeight;
  //     // 1、直接话行
  //     // let surface = Surface.create(tr, {
  //     //   type: 'canvas'
  //     // });
  //     // let surface = Surface.create(tr, {
  //     //   type: 'canvas',
  //     //   width: '0',
  //     //   height: '0'
  //     // });
  //     const path = new Path({
  //       stroke: {
  //         color: '#000000',
  //         width: 2
  //       }
  //     });
  //     //
  //     // const text = new Text('空闲', [15, 0], {font: 'normal 12px'});
  //     //
  //     // // path.moveTo(0, 0).lineTo(200, 0).close();
  //     // path.moveTo(0, 0).lineTo(800, 0);
  //     //
  //     // let group = new Group();
  //     //
  //     // group.append(path, text);
  //     //
  //     // group.transform(transform().translate(550, 0));
  //     //
  //     // surface.draw(group);
  //     // surface = null;
  //     // group = null;
  //
  //     // 2、以group组方式
  //     // const allTd = tr.querySelectorAll('td');
  //     // const group = new Group();
  //     // const elementGroup = group.append(allTd[1], allTd[3]);
  //     // const surface = Surface.create(group, {
  //     //   type: 'canvas'
  //     // });
  //     // path.moveTo(10, 10).lineTo(200, 10).close();
  //     // group.append(path);
  //     // surface.draw(group);
  //
  //     // 3、合并单元格绘制
  //     const allTd = tr.querySelectorAll('td');
  //     // 过滤行展开的td
  //     const allContentTd = _.filter(allTd, function (td) {
  //       return td.className !== 'k-hierarchy-cell';
  //     });
  //     for (let i = 0; i < allContentTd.length; i++) {
  //       switch (i) {
  //         case 0:
  //           allContentTd[i].setAttribute('colspan', allContentTd.length);
  //           break;
  //         default:
  //           allContentTd[i].style.display = 'none';
  //           break;
  //       }
  //     }
  //
  //     const surface = Surface.create(allContentTd[0], {
  //       type: 'canvas'
  //     });
  //     const geromeyStart = new geometry.Circle(Point.create(10, 15), 5);
  //     // const geromeyEnd = new geometry.Circle(Point.create(500, 15), 5);
  //     const geromeyEnd = new geometry.Circle(Point.create(500, 15), 5);
  //     const circleStart = new Circle(geromeyStart, {
  //       fill: {
  //         color: '#000000'
  //       },
  //       stroke: {
  //         width: 1,
  //         color: '#000000'
  //       }
  //     });
  //     const circleEnd = new Circle(geromeyEnd, {
  //       fill: {
  //         color: '#000000'
  //       },
  //       stroke: {
  //         width: 1,
  //         color: '#000000'
  //       }
  //     });
  //     path.moveTo(10, 15).lineTo(500, 15).close();
  //     const group = new Group();
  //     const text = new Text('空闲', [200, -5], {font: 'normal 12px'});
  //     group.append(circleStart, text, path, circleEnd);
  //     surface.draw(group);
  //   }
  //   // 绘制完成，删除引用
  //   gridEle = null;
  //   allRow = null;
  //
  // }

  private drawScene1(): void {
    const element = this.gridElement2['ariaRoot'].nativeElement;
    const allRow = element.querySelectorAll('tr');
    const contentRow = Array.prototype.slice.call(allRow, 1);
    for (let i = 0, len = contentRow.length; i < len; i++) {
      const tr = contentRow[i];
      const dataItem = this.channelData[i];
      // 3、合并单元格绘制
      const allTd = tr.querySelectorAll('td');
      // 过滤行展开的td
      const allContentTd = _.filter(allTd, function (td) {
        return td.className !== 'k-hierarchy-cell';
      });
      const width = allContentTd[0].clientWidth;
      const height = tr.clientHeight;
      for (let j = 0; j < allContentTd.length; j++) {
        switch (j) {
          case 0:
            allContentTd[j].setAttribute('colspan', allContentTd.length);
            allContentTd[j].setAttribute('id', `canvas${i}`);
            break;
          default:
            allContentTd[j].style.display = 'none';
            break;
        }
      }
      const graph = new Q.Graph(`canvas${i}`);
      graph.editable = false;
      graph.isMovable = false;
      graph.isSelectable = function () {
        return false;
      };
      graph.zoomToOverview = false;
      graph.originAtCenter = false;
      // 进行画线
      this.drawLine(dataItem.items, graph, width, height);
    }
  }

  private drawLine(items, graph: Q.Graph, width: number, height: number): void {
    const nodeStyle = {
      ARROW: Q.Consts.SHAPE_ARROW_5,
      CIRCLE: Q.Consts.SHAPE_CIRCLE
    };
    for (const item of items) {
      const start = graph.createShapeNode('', null, item.start * width + 2 * width / 3, height / 2);
      const end = graph.createShapeNode('', null, item.end * width + width / 3, height / 2);
      const edge = graph.createEdge(start, end);
      switch (item.direction) {
        case 0:
          edge.setStyle(Q.Styles.ARROW_FROM, nodeStyle.ARROW);
          edge.setStyle(Q.Styles.ARROW_TO, nodeStyle.CIRCLE);
          edge.setStyle(Q.Styles.EDGE_LINE_DASH, [8, 4, 0.01, 4]);
          break;
        case 1:
          edge.setStyle(Q.Styles.ARROW_FROM, nodeStyle.CIRCLE);
          edge.setStyle(Q.Styles.ARROW_TO, nodeStyle.ARROW);
          edge.setStyle(Q.Styles.EDGE_LINE_DASH, [8, 4, 0.01, 4]);
          break;
        default:
          edge.setStyle(Q.Styles.ARROW_FROM, nodeStyle.CIRCLE);
          edge.setStyle(Q.Styles.ARROW_TO, nodeStyle.CIRCLE);
          break;
      }
      edge.setStyle(Q.Styles.ARROW_FROM_FILL_COLOR, '#2898E0');
      edge.setStyle(Q.Styles.ARROW_TO_FILL_COLOR, '#2898E0');
      edge.setStyle(Q.Styles.EDGE_COLOR, '#2898E0');
      if (item.msg) {
        const label = new Q.LabelUI(item.msg);
        label.position = Q.Position.CENTER_TOP;
        label.anchorPosition = Q.Position.CENTER_BOTTOM;
        label.offsetX = 10;
        edge.addUI(label, {
          bindingProperty: 'data',
          property: 'leftLabel',
          propertyType: Q.Consts.PROPERTY_TYPE_STYLE
        });
      }
      if (item.direction !== 2 && item.next) {
        const label = new Q.LabelUI(item.next);
        if (item.direction === 0) {
          label.position = Q.Position.LEFT_BOTTOM;
          label.anchorPosition = Q.Position.LEFT_TOP;
        } else {
          label.position = Q.Position.RIGHT_BOTTOM;
          label.anchorPosition = Q.Position.RIGHT_TOP;
        }
        label.offsetX = 10;
        edge.addUI(label, {
          bindingProperty: 'data',
          property: 'leftLabel',
          propertyType: Q.Consts.PROPERTY_TYPE_STYLE
        });
      }
    }
  }
}
