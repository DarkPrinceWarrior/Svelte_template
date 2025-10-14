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
  import EditIcon from '$lib/icons/EditIcon.svelte';
  import DownloadIcon from '$lib/icons/DownloadIcon.svelte';

  const programs = [
    { id: 1, name: 'Инвестиционная программа 1', cost: '5.856 М руб.', y2020: '1.2 М руб.', y2021: '0.8 М руб.', y2022: '2.8 М руб.', y2023: '2.1 М руб.' },
    { id: 2, name: 'Инвестиционная программа 2', cost: '7.200 М руб.', y2020: '1.5 М руб.', y2021: '1.0 М руб.', y2022: '3.2 М руб.', y2023: '2.5 М руб.' },
    { id: 3, name: 'Инвестиционная программа 3', cost: '7.200 М руб.', y2020: '1.5 М руб.', y2021: '1.0 М руб.', y2022: '3.2 М руб.', y2023: '2.5 М руб.' },
    { id: 4, name: 'Инвестиционная программа 4', cost: '7.200 М руб.', y2020: '1.5 М руб.', y2021: '1.0 М руб.', y2022: '3.2 М руб.', y2023: '2.5 М руб.' },
    { id: 5, name: 'Инвестиционная программа 5', cost: '7.200 М руб.', y2020: '1.5 М руб.', y2021: '1.0 М руб.', y2022: '3.2 М руб.', y2023: '2.5 М руб.' },
    { id: 6, name: 'Инвестиционная программа 6', cost: '7.200 М руб.', y2020: '1.5 М руб.', y2021: '1.0 М руб.', y2022: '3.2 М руб.', y2023: '2.5 М руб.' }
  ];
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="reports">
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
      <a href="/reports" class="menu-item active">
        <DocumentIcon />
        <span>Отчеты</span>
      </a>
      <a href="/dashboards" class="menu-item">
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
    <h1 class="title">Отчеты</h1>

    <div class="filters">
      <div class="filter-item" style="width: 189px;">
        <span>Дата начала</span>
        <ChevronDownIcon />
      </div>
      <div class="filter-item" style="width: 189px;">
        <span>Дата конца</span>
        <ChevronDownIcon />
      </div>
      <div class="filter-item" style="width: 277px;">
        <span>Инвестиционные объекты</span>
        <ChevronDownIcon />
      </div>
      <div class="filter-item" style="width: 320px;">
        <span>Сводный отчет по годам</span>
        <ChevronDownIcon />
      </div>
    </div>

    <div class="table-wrapper">
      <div class="table-header">
        <div class="header-cell" style="width: 42px;">№</div>
        <div class="header-cell" style="width: 276px;">Инвестиционные программы</div>
        <div class="header-cell" style="width: 197px;">Стоимость проекта</div>
        <div class="header-cell investments-header" style="width: 513px;">
          <div class="investments-title">Инвестиции</div>
          <div class="investments-years">
            <div class="year-cell" style="width: 117px;">2020</div>
            <div class="year-cell" style="width: 117px;">2021</div>
            <div class="year-cell" style="width: 117px;">2022</div>
            <div class="year-cell" style="width: 126px;">2023</div>
          </div>
        </div>
      </div>

      <div class="table-body">
        {#each programs as program}
          <div class="table-row">
            <div class="table-cell" style="width: 42px;">{program.id}</div>
            <div class="table-cell" style="width: 276px;">{program.name}</div>
            <div class="table-cell" style="width: 197px;">{program.cost}</div>
            <div class="table-cell" style="width: 117px;">{program.y2020}</div>
            <div class="table-cell" style="width: 117px;">{program.y2021}</div>
            <div class="table-cell" style="width: 117px;">{program.y2022}</div>
            <div class="table-cell" style="width: 126px;">{program.y2023}</div>
          </div>
        {/each}
      </div>
    </div>

    <div class="actions">
      <button class="action-btn">
        <EditIcon />
        <span>Редактировать</span>
      </button>
      <button class="action-btn">
        <DownloadIcon />
        <span>Скачать</span>
      </button>
    </div>
  </main>
</div>

<style>
  .reports {
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

  .menu-item:hover,
  .menu-item.active {
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
    padding: 64px 80px;
    overflow-x: auto;
  }

  .title {
    color: #FFFFFF;
    font-size: 32px;
    font-weight: 500;
    margin-bottom: 48px;
    text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);
  }

  .filters {
    display: flex;
    gap: 29px;
    margin-bottom: 48px;
  }

  .filter-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 28px;
    padding: 0 12px;
    background-color: #152536;
    border-radius: 8px;
    color: #FFFFFF;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
    text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);
  }

  .filter-item:hover {
    background-color: #1a2d42;
  }

  .filter-item :global(svg) {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  .table-wrapper {
    margin-bottom: 32px;
  }

  .table-header {
    display: flex;
    gap: 11px;
    height: 85px;
    margin-bottom: 13px;
  }

  .header-cell {
    background-color: #152536;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
    font-size: 16px;
    font-weight: 700;
    text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);
    padding: 12px;
  }

  .investments-header {
    flex-direction: column;
    padding: 0;
    justify-content: flex-start;
  }

  .investments-title {
    width: 100%;
    padding: 12px;
    text-align: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .investments-years {
    display: flex;
    width: 100%;
    flex: 1;
  }

  .year-cell {
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
  }

  .year-cell:last-child {
    border-right: none;
  }

  .table-body {
    display: flex;
    flex-direction: column;
    gap: 13px;
  }

  .table-row {
    display: flex;
    gap: 11px;
    height: 49px;
  }

  .table-cell {
    background-color: #152536;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
    font-size: 14px;
    font-weight: 500;
    text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);
    padding: 12px;
  }

  .actions {
    display: flex;
    gap: 16px;
    justify-content: flex-end;
  }

  .action-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    background-color: #152536;
    border: none;
    border-radius: 8px;
    color: #FFFFFF;
    font-size: 14px;
    font-weight: 600;
    font-family: 'Manrope', sans-serif;
    cursor: pointer;
    transition: background-color 0.2s;
    text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);
  }

  .action-btn:hover {
    background-color: #1a2d42;
  }

  .action-btn :global(svg) {
    width: 24px;
    height: 24px;
  }
</style>
