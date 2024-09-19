'use client'

import React, { useState, useEffect } from 'react'
import { Leaf, Search, Filter, Video, BookOpen, FileText, AlertTriangle, Zap, Recycle, Calendar, Users, Award, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import { Dialog, Transition } from '@headlessui/react'
import { Tab } from '@headlessui/react'

// Примерные данные для демонстрации
const ecoContent = [
  { id: 1, title: 'Снижение углеродного следа', category: 'Зеленые технологии', type: 'статья', author: 'Др. Елена Петрова', date: '2023-05-15', views: 1200, likes: 89 },
  { id: 2, title: 'Руководство по сортировке отходов', category: 'Управление отходами', type: 'видео', author: 'Иван Соколов', date: '2023-05-10', views: 3500, likes: 245 },
  { id: 3, title: 'Зеленые инициативы Москвы', category: 'Городские программы', type: 'инфографика', author: 'Мария Иванова', date: '2023-05-05', views: 2800, likes: 176 },
  { id: 4, title: 'Как организовать эко-мероприятие', category: 'Экологическое образование', type: 'руководство', author: 'Алексей Волков', date: '2023-04-30', views: 1800, likes: 132 },
  { id: 5, title: 'Советы по устойчивому образу жизни', category: 'Образ жизни', type: 'статья', author: 'Наталья Смирнова', date: '2023-04-25', views: 2100, likes: 154 },
]

const categories = ['Зеленые технологии', 'Управление отходами', 'Городские программы', 'Экологическое образование', 'Образ жизни']

const ecoStats = {
  totalArticles: 500,
  activeUsers: 10000,
  eventsOrganized: 150,
  treesPlanted: 5000
}

const upcomingEvents = [
  { id: 1, title: 'Очистка реки Москвы', date: '2023-06-15', participants: 200 },
  { id: 2, title: 'Выставка зеленых технологий', date: '2023-07-01', participants: 500 },
  { id: 3, title: 'Фестиваль эко-фильмов', date: '2023-07-10', participants: 1000 },
]

function ContentCard({ item } : any) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold text-green-700 mb-2">{item.title}</h2>
      <p className="text-green-600 mb-4">{item.category}</p>
      <div className="flex items-center text-green-500 mb-4">
        {item.type === 'статья' && <FileText className="mr-2" />}
        {item.type === 'видео' && <Video className="mr-2" />}
        {item.type === 'инфографика' && <BookOpen className="mr-2" />}
        {item.type === 'руководство' && <AlertTriangle className="mr-2" />}
        <span className="capitalize">{item.type}</span>
      </div>
      <div className={`overflow-hidden transition-max-height duration-300 ease-in-out ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
        <p className="text-gray-600 mb-2">Автор: {item.author}</p>
        <p className="text-gray-600 mb-2">Опубликовано: {item.date}</p>
        <p className="text-gray-600 mb-2">Просмотры: {item.views}</p>
        <p className="text-gray-600 mb-4">Лайки: {item.likes}</p>
      </div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-green-600 hover:text-green-800 flex items-center"
      >
        {isExpanded ? (
          <>
            <ChevronUp className="mr-1" /> Свернуть
          </>
        ) : (
          <>
            <ChevronDown className="mr-1" /> Развернуть
          </>
        )}
      </button>
    </div>
  )
}

function StatCard({ icon, title, value } : any) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md text-center">
      {icon}
      <h3 className="text-lg font-semibold text-green-700 mt-2">{title}</h3>
      <p className="text-2xl font-bold text-green-600">{value}</p>
    </div>
  )
}

function EventCard({ event } : any) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-green-700">{event.title}</h3>
      <p className="text-green-600">Дата: {event.date}</p>
      <p className="text-green-600">Участники: {event.participants}</p>
    </div>
  )
}

export function EcoKnowledgePortalComponent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedContent, setSelectedContent] = useState(null)

  const filteredContent = ecoContent.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === '' || item.category === selectedCategory)
  )

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <h1 className="text-4xl font-bold text-green-800 mb-8 flex items-center">
        <Leaf className="mr-2" /> Портал экологических знаний
      </h1>

      <div className="mb-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Поиск экологического контента..."
            className="w-full p-2 pl-10 rounded-lg border-2 border-green-300 focus:outline-none focus:border-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-green-400" />
        </div>
        <select
          className="p-2 rounded-lg border-2 border-green-300 focus:outline-none focus:border-green-500 bg-white"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Все категории</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
        {filteredContent.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>

      <div className="bg-green-100 p-6 rounded-lg mb-12">
        <h2 className="text-2xl font-bold text-green-800 mb-6">Статистика экологического воздействия</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={<FileText className="mx-auto text-green-600" size={32} />} title="Всего статей" value={ecoStats.totalArticles} />
          <StatCard icon={<Users className="mx-auto text-green-600" size={32} />} title="Активных пользователей" value={ecoStats.activeUsers} />
          <StatCard icon={<Calendar className="mx-auto text-green-600" size={32} />} title="Организовано мероприятий" value={ecoStats.eventsOrganized} />
          <StatCard icon={<Leaf className="mx-auto text-green-600" size={32} />} title="Посажено деревьев" value={ecoStats.treesPlanted} />
        </div>
      </div>

      <div className="bg-green-100 p-6 rounded-lg mb-12">
        <h2 className="text-2xl font-bold text-green-800 mb-6">Предстоящие эко-мероприятия</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>

      <div className="bg-green-100 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-green-800 mb-4">Быстрые ссылки</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a href="#" className="flex items-center text-green-700 hover:text-green-900">
            <Zap className="mr-2" /> Практические эко-советы
          </a>
          <a href="#" className="flex items-center text-green-700 hover:text-green-900">
            <AlertTriangle className="mr-2" /> Как участвовать
          </a>
          <a href="#" className="flex items-center text-green-700 hover:text-green-900">
            <Recycle className="mr-2" /> Эко-инициативы Москвы
          </a>
        </div>
      </div>
    </div>
  )
}