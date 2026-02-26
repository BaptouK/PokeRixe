import {Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, Input} from '@angular/core';
import * as echarts from 'echarts';
import {PokeStats} from '../../services/model/pokeStats';

@Component({
  selector: 'app-star-stats',
  templateUrl: './star-stats.html',
  styleUrls: ['./star-stats.css'], // Note : `styleUrls` (pluriel) et non `styleUrl`
})
export class StarStats implements AfterViewInit, OnDestroy {
  @ViewChild('chartContainer', { static: false })
  chartContainer!: ElementRef<HTMLDivElement>;

  private chart: echarts.ECharts | null = null;

  @Input() stats: PokeStats = {} as PokeStats; // Typage explicite

  // Exemple d'options pour un graphique ECharts
  chartOptions: echarts.EChartsOption ={
    title: {
      text: 'STATISTIQUES',
      left: 'center',
      top: '10%', // Positionne le titre plus haut
      textStyle: {
        color: '#FFDE00',
        fontSize: 50, // Taille de police réduite pour s'adapter
        fontWeight: 'bold',
      },
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      textStyle: {
        color: '#fff',
      },
    },
    radar: {
      radius: '60%', // Rayon du radar (60% de la taille du conteneur)
      center: ['50%', '55%'], // Centre le radar
      indicator: [
        { name: 'PV', max: 255 },
        { name: 'Attaque Sp.', max: 255 },
        { name: 'Défense Sp.', max: 255 },
        { name: 'Attaque Sp.', max: 255 },
        { name: 'Défense', max: 255 },
        { name: 'Attaque', max: 255 },
      ],
      shape: 'polygon',
      splitNumber: 5,
      axisName: {
        color: '#FFDE00',
        fontSize: 14, // Taille de police réduite pour les labels
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 222, 0, 0)',
        },
      },
      splitArea: {
        areaStyle: {
          color: ['rgba(255, 222, 0, 0.1)', 'rgba(255, 222, 0, 0.05)'],
        },
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 222, 0, 0.5)',
        },
      },
    },
    series: [
      {
        name: 'Stats',
        type: 'radar',
        data: [
          {
            value: [this.stats.special_attack, 80, 50, 75, 65, 90],
            name: 'Pikachu',
            areaStyle: {
              color: 'rgba(255, 222, 0, 0.5)',
            },
            lineStyle: {
              color: '#FFDE00',
              width: 2,
            },
            symbol: 'none',
          },
        ],
      },
    ],
  };

  ngAfterViewInit(): void {
    // Initialiser le chart seulement si l'élément existe
    if (!this.chartContainer || !this.chartContainer.nativeElement) return;

    try {
      this.chart = echarts.init(this.chartContainer.nativeElement);
      this.chart.setOption(this.chartOptions);
    } catch (e) {
      // Si l'initialisation échoue, logguer pour debug mais ne pas casser l'app
      // console.warn('ECharts init failed', e);
    }

    // Redimensionnement responsive
    window.addEventListener('resize', this.onWindowResize);
  }

  private onWindowResize = () => {
    if (this.chart) {
      this.chart.resize();
    }
  };

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onWindowResize);
    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
  }
}
