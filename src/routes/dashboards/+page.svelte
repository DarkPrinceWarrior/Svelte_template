<script lang="ts">
  import { onMount } from 'svelte';
  import { Chart, registerables } from 'chart.js';
  import { ChevronDown } from 'lucide-svelte';
  import Logo from '../home/Logo.svelte';
  import FolderIcon from '../home/icons/FolderIcon.svelte';
  import DocumentIcon from '../home/icons/DocumentIcon.svelte';
  import BarChartIcon from '../home/icons/BarChartIcon.svelte';
  import ShareIcon from '../home/icons/ShareIcon.svelte';
  import SettingsIcon from '../home/icons/SettingsIcon.svelte';
  import HelpIcon from '../home/icons/HelpIcon.svelte';

  Chart.register(...registerables);

  let npvIrrChart: HTMLCanvasElement;
  let planFactChart: HTMLCanvasElement;
  let riskChart: HTMLCanvasElement;
  let investmentChart: HTMLCanvasElement;

  onMount(() => {
    new Chart(npvIrrChart, {
      type: 'line',
      data: {
        labels: ['Май', 'Июнь', 'Июль', 'Август', 'Сент', 'Окт', 'Ноя'],
        datasets: [
          {
            label: 'NPV',
            data: [28, 25, 22, 20, 24, 27, 32],
            borderColor: '#E95233',
            backgroundColor: 'transparent',
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 0,
          },
          {
            label: 'IRR',
            data: [30, 28, 25, 23, 28, 30, 28],
            borderColor: '#2CE89B',
            backgroundColor: 'transparent',
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 0,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: {
              color: '#FFFFFF',
              usePointStyle: true,
              pointStyle: 'circle',
              font: { size: 12, family: 'Manrope' }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#FFFFFF', font: { size: 12, family: 'Manrope' } }
          },
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            ticks: { color: '#FFFFFF', font: { size: 12, family: 'Manrope' } }
          }
        }
      }
    });

    new Chart(planFactChart, {
      type: 'bar',
      data: {
        labels: ['ПИР', 'СМР', 'МТО', 'ПНР', 'Прочие'],
        datasets: [
          {
            label: 'План',
            data: [138, 160, 80, 42, 81],
            backgroundColor: '#2CE89B',
            borderRadius: 4,
          },
          {
            label: 'Факт',
            data: [81, 115, 100, 98, 81],
            backgroundColor: '#577BFB',
            borderRadius: 4,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: {
              color: '#FFFFFF',
              usePointStyle: true,
              pointStyle: 'circle',
              font: { size: 12, family: 'Manrope' }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#FFFFFF', font: { size: 12, family: 'Manrope' } }
          },
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            ticks: { color: '#FFFFFF', font: { size: 12, family: 'Manrope' } }
          }
        }
      }
    });

    new Chart(riskChart, {
      type: 'bar',
      data: {
        labels: ['ПИР', 'СМР', 'МТО', 'ПНР', 'Прочие'],
        datasets: [
          {
            label: 'Критический риск',
            data: [20, 31, 98, 9, 25],
            backgroundColor: '#E95233',
            borderRadius: 4,
          },
          {
            label: 'Средний риск',
            data: [58, 58, 37, 67, 72],
            backgroundColor: '#577BFB',
            borderRadius: 4,
          },
          {
            label: 'Низкий риск',
            data: [54, 80, 45, 108, 68],
            backgroundColor: '#2CE89B',
            borderRadius: 4,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'start',
            labels: {
              color: '#FFFFFF',
              usePointStyle: true,
              pointStyle: 'rect',
              font: { size: 10, family: 'Manrope' }
            }
          }
        },
        scales: {
          x: {
            stacked: true,
            grid: { display: false },
            ticks: { color: '#FFFFFF', font: { size: 12, family: 'Manrope' } }
          },
          y: {
            stacked: true,
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            ticks: { color: '#FFFFFF', font: { size: 12, family: 'Manrope' } }
          }
        }
      }
    });

    new Chart(investmentChart, {
      type: 'line',
      data: {
        labels: ['Май', 'Июнь', 'Июль', 'Август', 'Сент', 'Окт', 'Ноя'],
        datasets: [
          {
            label: 'План',
            data: [38, 28, 24, 26, 32, 36, 40],
            borderColor: '#E95233',
            backgroundColor: 'transparent',
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 0,
          },
          {
            label: 'Факт',
            data: [28, 30, 28, 26, 28, 32, 20],
            borderColor: '#577BFB',
            backgroundColor: 'transparent',
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 0,
          },
          {
            label: 'Прогноз',
            data: [12, 10, 12, 14, 16, 18, 20],
            borderColor: '#2CE89B',
            backgroundColor: 'transparent',
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 0,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: {
              color: '#FFFFFF',
              usePointStyle: true,
              pointStyle: 'circle',
              font: { size: 12, family: 'Manrope' }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#FFFFFF', font: { size: 12, family: 'Manrope' } }
          },
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            ticks: { color: '#FFFFFF', font: { size: 12, family: 'Manrope' } }
          }
        }
      }
    });
  });
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;600&display=swap" rel="stylesheet">
</svelte:head>

<div class="dashboard">
  <aside class="sidebar">
    <div class="logo">
      <Logo />
    </div>

    <nav class="menu">
      <a href="/" class="menu-item">
        <FolderIcon />
        <span>Проекты</span>
      </a>
      <a href="/reports" class="menu-item">
        <DocumentIcon />
        <span>Отчеты</span>
      </a>
      <a href="/dashboards" class="menu-item active">
        <BarChartIcon />
        <span>Дашборды</span>
      </a>
      <a href="/integrations" class="menu-item">
        <ShareIcon />
        <span>Интеграции</span>
      </a>
      <a href="/settings" class="menu-item">
        <SettingsIcon />
        <span>Настройки</span>
      </a>
      <a href="/help" class="menu-item">
        <HelpIcon />
        <span>Справка</span>
      </a>
    </nav>

    <div class="user-card">
      <div class="avatar">ИФ</div>
      <div class="user-info">
        <div class="user-name">Имя Фамилия</div>
        <div class="user-email">guests.email@tatneft.ru</div>
      </div>
    </div>
  </aside>

  <main class="content">
    <h1 class="title">Сводный дашборд</h1>

    <div class="filters">
      <button class="filter">
        <span>Дата начала</span>
        <ChevronDown size={20} />
      </button>
      <button class="filter">
        <span>Дата конца</span>
        <ChevronDown size={20} />
      </button>
      <button class="filter wide">
        <span>Инвестиционные объекты</span>
        <ChevronDown size={20} />
      </button>
    </div>

    <div class="kpi-cards">
      <div class="kpi-card">
        <div class="kpi-value">55%</div>
        <div class="kpi-label">% завершенных проектов</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-value">15 дней</div>
        <div class="kpi-label">Среднее отклонение</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-value">30%</div>
        <div class="kpi-label">% критических контрактов</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-value">78%</div>
        <div class="kpi-label">Выполнение по плану</div>
      </div>
    </div>

    <div class="charts-row-1">
      <div class="chart-block">
        <div class="chart-title">Динамика NPV / IRR</div>
        <canvas bind:this={npvIrrChart}></canvas>
      </div>
      <div class="chart-block">
        <div class="chart-title">План / Факт по этапам</div>
        <canvas bind:this={planFactChart}></canvas>
      </div>
    </div>

    <div class="charts-row-2">
      <div class="chart-block">
        <div class="chart-title">Индикаторы риска по направлениям</div>
        <canvas bind:this={riskChart}></canvas>
      </div>
      <div class="chart-block wide">
        <div class="chart-title">Освоение инвестиций</div>
        <canvas bind:this={investmentChart}></canvas>
      </div>
    </div>
  </main>
</div>

<style>
  .dashboard {
    display: flex;
    min-height: 100vh;
    background-color: #0F1D2D;
    font-family: 'Manrope', sans-serif;
  }

  .sidebar {
    width: 250px;
    background-color: #152536;
    border-top-right-radius: 30px;
    display: flex;
    flex-direction: column;
    padding: 32px 0;
    flex-shrink: 0;
  }

  .logo {
    padding: 0 24px 48px 24px;
  }

  .menu {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 0 16px;
    flex: 1;
  }

  .menu-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    color: #FFFFFF;
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    border-radius: 8px;
    transition: background-color 0.2s;
    text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);
  }

  .menu-item:hover, .menu-item.active {
    background-color: rgba(255, 255, 255, 0.05);
  }

  .user-card {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 24px;
    margin: 0 16px;
    background-color: #152536;
    border-radius: 12px;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #3E4141;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
    font-size: 14px;
    font-weight: 600;
    flex-shrink: 0;
    text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);
  }

  .user-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    overflow: hidden;
  }

  .user-name {
    color: #FFFFFF;
    font-size: 14px;
    font-weight: 500;
    text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);
  }

  .user-email {
    color: #FFFFFF;
    opacity: 0.5;
    font-size: 10px;
    font-weight: 600;
    text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);
  }

  .content {
    flex: 1;
    padding: 40px 48px;
  }

  .title {
    color: #FFFFFF;
    font-size: 32px;
    font-weight: 500;
    margin-bottom: 24px;
    text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);
  }

  .filters {
    display: flex;
    gap: 33px;
    margin-bottom: 24px;
  }

  .filter {
    width: 189px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    background-color: #152536;
    border: none;
    border-radius: 8px;
    color: #FFFFFF;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
    text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);
  }

  .filter.wide {
    width: 277px;
  }

  .filter:hover {
    background-color: #1a2d42;
  }

  .kpi-cards {
    display: flex;
    gap: 23px;
    margin-bottom: 24px;
  }

  .kpi-card {
    width: 252px;
    background-color: #152536;
    border-radius: 12px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .kpi-value {
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 8px;
    background: linear-gradient(90deg, #6FEDE5 0%, #2CE89B 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: none;
  }

  .kpi-label {
    color: #FFFFFF;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);
  }

  .charts-row-1 {
    display: flex;
    gap: 12px;
    margin-bottom: 12px;
  }

  .charts-row-2 {
    display: flex;
    gap: 21px;
  }

  .chart-block {
    background-color: #152536;
    border-radius: 12px;
    padding: 24px;
    flex: 1;
    min-height: 291px;
  }

  .chart-block.wide {
    min-width: 595px;
    min-height: 354px;
  }

  .chart-title {
    color: #FFFFFF;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 16px;
    text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);
  }

  canvas {
    max-height: 230px;
  }

  .charts-row-2 canvas {
    max-height: 290px;
  }
</style>
