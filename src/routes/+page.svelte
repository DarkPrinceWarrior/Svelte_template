<script lang="ts">
  import Logo from './home/Logo.svelte';
  import HomeIcon from './home/icons/HomeIcon.svelte';
  import FolderIcon from './home/icons/FolderIcon.svelte';
  import DocumentIcon from './home/icons/DocumentIcon.svelte';
  import BarChartIcon from './home/icons/BarChartIcon.svelte';
  import ShareIcon from './home/icons/ShareIcon.svelte';
  import SettingsIcon from './home/icons/SettingsIcon.svelte';
  import HelpIcon from './home/icons/HelpIcon.svelte';
  import ChevronDownIcon from './home/icons/ChevronDownIcon.svelte';
  import BuildingIcon from './home/icons/BuildingIcon.svelte';
  import FileIcon from './home/icons/FileIcon.svelte';
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
    <h1 class="title">Система управления инвестиционным финансированием</h1>

    <div class="cards">
      <a href="/dashboards" class="card">
        <div class="card-icon">
          <BuildingIcon />
        </div>
        <h2 class="card-title">Дашборды</h2>
        <p class="card-description">BI-аналитика по финансам и инвестиционным объектам</p>
      </a>

      <a href="/reports" class="card">
        <div class="card-icon">
          <FileIcon />
        </div>
        <h2 class="card-title">Отчеты</h2>
        <p class="card-description">Выгрузка отчетов по периодам и инвестиционным объектам</p>
      </a>

      <a href="/integrations" class="card">
        <div class="card-icon">
          <ShareIcon />
        </div>
        <h2 class="card-title">Интеграции</h2>
        <p class="card-description">Доступ к данным, интегрированным с других платформ</p>
      </a>
    </div>

    <div class="selector-wrapper">
      <button class="selector">
        <span>Выберите инвестиционный объект</span>
        <ChevronDownIcon />
      </button>
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

  .menu-item:hover {
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 64px 80px;
  }

  .title {
    color: #FFFFFF;
    font-size: 32px;
    font-weight: 500;
    margin-bottom: 48px;
    text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);
    text-align: center;
  }

  .cards {
    display: flex;
    gap: 47px;
    margin-bottom: 48px;
  }

  .card {
    width: 267px;
    background-color: #152536;
    border-radius: 16px;
    padding: 24px;
    text-decoration: none;
    transition: transform 0.2s, box-shadow 0.2s;
    cursor: pointer;
  }

  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }

  .card-icon {
    width: 32px;
    height: 32px;
    margin-bottom: 16px;
  }

  .card-icon :global(svg) {
    width: 100%;
    height: 100%;
  }

  .card-title {
    color: #FFFFFF;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 8px;
    text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);
  }

  .card-description {
    color: #FFFFFF;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.5;
    opacity: 0.7;
    text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);
  }

  .selector-wrapper {
    width: 100%;
    max-width: 600px;
  }

  .selector {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    background-color: #152536;
    border: none;
    border-radius: 12px;
    color: #FFFFFF;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
    text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);
  }

  .selector:hover {
    background-color: #1a2d42;
  }
</style>
