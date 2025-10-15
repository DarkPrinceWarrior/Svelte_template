<script lang="ts">
  import Logo from '../home/Logo.svelte';
  import HomeIcon from '../home/icons/HomeIcon.svelte';
  import FolderIcon from '../home/icons/FolderIcon.svelte';
  import DocumentIcon from '../home/icons/DocumentIcon.svelte';
  import BarChartIcon from '../home/icons/BarChartIcon.svelte';
  import ShareIcon from '../home/icons/ShareIcon.svelte';
  import SettingsIcon from '../home/icons/SettingsIcon.svelte';
  import HelpIcon from '../home/icons/HelpIcon.svelte';
  import ChevronDownIcon from '../home/icons/ChevronDownIcon.svelte';
  import { RefreshCw, Calendar } from 'lucide-svelte';

  const integrations = [
    { source: '1C:УХ', dataType: 'Финансирование', update: '15.07.2025 02:30', records: '298/298', status: 'success' },
    { source: '1C:УХ', dataType: 'Финансирование', update: '15.07.2025 02:30', records: '0 / 344', status: 'error' },
    { source: '1C:УХ', dataType: 'Финансирование', update: '15.07.2025 02:30', records: '100/120', status: 'partial' },
    { source: '1C:УХ', dataType: 'Финансирование', update: '15.07.2025 02:30', records: '567/567', status: 'success' }
  ];

  const chartData = [
    { name: 'Успешно', value: 965, color: '#2CE89B' },
    { name: 'Частично', value: 120, color: '#577BFB' },
    { name: 'Ошибка', value: 364, color: '#E95233' }
  ];

  const total = chartData.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;

  const createArcPath = (value: number, color: string) => {
    const percentage = value / total;
    const angle = percentage * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;

    currentAngle = endAngle;

    const startRad = (startAngle - 90) * Math.PI / 180;
    const endRad = (endAngle - 90) * Math.PI / 180;

    const cx = 100;
    const cy = 100;
    const radius = 80;

    const x1 = cx + radius * Math.cos(startRad);
    const y1 = cy + radius * Math.sin(startRad);
    const x2 = cx + radius * Math.cos(endRad);
    const y2 = cy + radius * Math.sin(endRad);

    const largeArc = angle > 180 ? 1 : 0;

    return {
      path: `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`,
      midAngle: (startAngle + endAngle) / 2
    };
  };

  const paths = chartData.map((item) => ({
    ...item,
    ...createArcPath(item.value, item.color)
  }));
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="dashboard">
  <aside class="sidebar">
    <div class="logo">
      <Logo />
    </div>

    <nav class="menu">
      <a href="/" class="menu-item">
        <HomeIcon />
        <span>Главное</span>
      </a>
      <a href="/projects" class="menu-item">
        <FolderIcon />
        <span>Проекты</span>
      </a>
      <a href="/reports" class="menu-item">
        <DocumentIcon />
        <span>Отчеты</span>
      </a>
      <a href="/dashboards" class="menu-item">
        <BarChartIcon />
        <span>Дашборды</span>
      </a>
      <a href="/integrations" class="menu-item active">
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
    <h1 class="title">Интеграции</h1>

    <div class="table-wrapper">
      <div class="table-container">
        <div class="table-header">
          <div class="header-cell source">
            <span>Источник</span>
            <ChevronDownIcon />
          </div>
          <div class="header-cell data-type">
            <span>Тип данных</span>
            <ChevronDownIcon />
          </div>
          <div class="header-cell update">
            <span>Обновление</span>
            <ChevronDownIcon />
          </div>
          <div class="header-cell records">
            <span>Обновлено записей</span>
          </div>
          <div class="header-cell status">
            <span>Статус</span>
            <ChevronDownIcon />
          </div>
        </div>

        {#each integrations as integration}
          <div class="table-row">
            <div class="cell source">{integration.source}</div>
            <div class="cell data-type">{integration.dataType}</div>
            <div class="cell update">{integration.update}</div>
            <div class="cell records">{integration.records}</div>
            <div class="cell status">
              <span class="status-badge {integration.status}">
                {#if integration.status === 'success'}
                  Успешно
                {:else if integration.status === 'error'}
                  Ошибка
                {:else if integration.status === 'partial'}
                  Частично
                {/if}
              </span>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <div class="bottom-section">
      <div class="chart-block">
        <h3 class="block-title">Загруженные данные</h3>
        <svg viewBox="0 0 280 200" class="pie-chart">
          {#each paths as segment}
            <path d={segment.path} fill={segment.color} />
          {/each}
          <circle cx="100" cy="100" r="50" fill="#0F1D2D" />

          {#each paths as segment, i}
            {@const angle = segment.midAngle * Math.PI / 180}
            {@const labelRadius = 95}
            {@const x = 100 + labelRadius * Math.cos(angle)}
            {@const y = 100 + labelRadius * Math.sin(angle)}
            {@const lineEndX = 100 + (labelRadius + 25) * Math.cos(angle)}
            {@const lineEndY = 100 + (labelRadius + 25) * Math.sin(angle)}
            {@const textX = 100 + (labelRadius + 35) * Math.cos(angle)}
            {@const textY = 100 + (labelRadius + 35) * Math.sin(angle)}
            {@const textAnchor = angle > 90 && angle < 270 ? 'end' : 'start'}

            <line
              x1={x}
              y1={y}
              x2={lineEndX}
              y2={lineEndY}
              stroke="white"
              stroke-width="1"
            />
            <text
              x={textX}
              y={textY}
              fill="white"
              font-size="12"
              font-family="Manrope"
              font-weight="500"
              text-anchor={textAnchor}
              dominant-baseline="middle"
              style="text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);"
            >
              {segment.name}
            </text>
          {/each}
        </svg>
        <div class="chart-labels">
          {#each chartData as item}
            <div class="chart-label">
              <span class="label-dot" style="background-color: {item.color}"></span>
              <span class="label-text">{item.name}</span>
            </div>
          {/each}
        </div>
      </div>

      <div class="right-column">
        <div class="kpi-cards">
          <div class="kpi-card loaded">
            <div class="kpi-value">965</div>
            <div class="kpi-label">Загружено</div>
          </div>
          <div class="kpi-card errors">
            <div class="kpi-value">364</div>
            <div class="kpi-label">Ошибки</div>
          </div>
        </div>

        <div class="action-buttons">
          <button class="action-btn">
            <RefreshCw size={20} />
            <span>Обновить данные</span>
          </button>
          <button class="action-btn">
            <Calendar size={20} />
            <span>Настроить расписание</span>
          </button>
        </div>
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
    padding: 48px;
  }

  .title {
    color: #FFFFFF;
    font-size: 32px;
    font-weight: 500;
    margin-bottom: 32px;
    text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);
  }

  .table-wrapper {
    margin-bottom: 32px;
  }

  .table-container {
    background-color: #152536;
    border-radius: 12px;
    overflow: hidden;
    display: inline-block;
  }

  .table-header {
    display: flex;
    height: 43px;
    align-items: center;
    padding: 0 20px;
    background-color: #152536;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .header-cell {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #FFFFFF;
    font-size: 16px;
    font-weight: 700;
    text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);
  }

  .header-cell.source { width: 135px; }
  .header-cell.data-type { width: 253px; }
  .header-cell.update { width: 226px; }
  .header-cell.records { width: 181px; }
  .header-cell.status { width: 123px; }

  .table-row {
    display: flex;
    height: 43px;
    align-items: center;
    padding: 0 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .table-row:last-child {
    border-bottom: none;
  }

  .cell {
    color: #FFFFFF;
    font-size: 16px;
    font-weight: 500;
    text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);
  }

  .cell.source { width: 135px; }
  .cell.data-type { width: 253px; }
  .cell.update { width: 226px; }
  .cell.records { width: 181px; }
  .cell.status { width: 123px; }

  .status-badge {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
  }

  .status-badge.success {
    color: #2CE89B;
    background-color: rgba(44, 232, 155, 0.1);
  }

  .status-badge.error {
    color: #E95233;
    background-color: rgba(233, 82, 51, 0.1);
  }

  .status-badge.partial {
    background: linear-gradient(90deg, #577BFB 0%, #6AD5F2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .bottom-section {
    display: grid;
    grid-template-columns: 412px 1fr;
    grid-template-rows: auto auto;
    gap: 12px;
  }

  .chart-block {
    background-color: #152536;
    border-radius: 12px;
    padding: 24px;
    grid-row: 1 / 3;
  }

  .block-title {
    color: #FFFFFF;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 20px;
    text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);
  }

  .pie-chart {
    width: 100%;
    height: 200px;
    margin: 0 auto;
    display: block;
  }

  .chart-labels {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 16px;
  }

  .chart-label {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .label-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }

  .label-text {
    color: #FFFFFF;
    font-size: 14px;
    font-weight: 500;
    text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);
  }

  .right-column {
    display: flex;
    flex-direction: column;
    gap: 12px;
    grid-row: 1 / 2;
  }

  .kpi-cards {
    display: flex;
    gap: 12px;
  }

  .kpi-card {
    background-color: #152536;
    border-radius: 12px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
  }

  .kpi-value {
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 8px;
    text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);
  }

  .kpi-card.loaded .kpi-value {
    color: #2CE89B;
  }

  .kpi-card.errors .kpi-value {
    color: #E95233;
  }

  .kpi-label {
    color: #FFFFFF;
    font-size: 16px;
    font-weight: 500;
    text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);
  }

  .action-buttons {
    display: flex;
    gap: 12px;
    grid-column: 1 / 3;
    grid-row: 2 / 3;
  }

  .action-btn {
    flex: 1;
    background-color: #152536;
    border: none;
    border-radius: 12px;
    padding: 16px 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    color: #FFFFFF;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
    text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);
  }

  .action-btn:hover {
    background-color: #1a2d42;
  }
</style>
