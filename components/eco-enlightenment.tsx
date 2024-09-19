'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import Link from 'next/link'
import { MapPinIcon, CalendarIcon, UsersIcon, LeafIcon, SearchIcon, TrendingUpIcon, BookOpenIcon, RecycleIcon, BirdIcon, MenuIcon, DownloadIcon, LogInIcon, LogOutIcon, UserIcon, SettingsIcon } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ImprovedAdminPanelComponent } from "./improved-admin-panel"

export function EcoEnlightenmentComponent() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<'user' | 'organizer' | 'admin'>('user')
  const [eventFilter, setEventFilter] = useState('all')
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false)

  const filteredEvents = []

  const trendingTopics = ["Переработка пластика", "Городское озеленение", "Экологичный транспорт", "Энергоэффективность", "Раздельный сбор"]

  const handleLogin = (role: 'user' | 'organizer' | 'admin') => {
    setIsLoggedIn(true)
    setUserRole(role)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserRole('user')
  }

  const handleAdminPanelOpen = () => {
    setIsAdminPanelOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-emerald-100">
      <header className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white p-4 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold flex items-center">
            <LeafIcon className="mr-2 h-8 w-8" />
            Экопросвет
          </h1>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li><a href="#about" className="hover:underline text-lg">О нас</a></li>
              <li><a href="#events" className="hover:underline text-lg">События</a></li>
              <li><a href="#community" className="hover:underline text-lg">Сообщество</a></li>
              <li><a href="#resources" className="hover:underline text-lg">Ресурсы</a></li>
            </ul>
          </nav>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">shadcn</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        m@example.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {userRole === 'organizer' && (
                    <Link href={`/orginizer`}>
                      <DropdownMenuItem>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>Мои мероприятия</span>
                      </DropdownMenuItem>
                    </Link>
                  )}
                  {userRole === 'user' && (
                    <Link href={`/map`}>
                      <DropdownMenuItem>
                        <MapPinIcon className="mr-2 h-4 w-4" />
                        <span>Карта</span>
                      </DropdownMenuItem>
                    </Link>
                  )}
                  {userRole === 'user' && (
                    <Link href={`/selection`}>
                      <DropdownMenuItem>
                        <TrendingUpIcon className="mr-2 h-4 w-4" />
                        <span>Подбор</span>
                      </DropdownMenuItem>
                    </Link>
                  )}
                  {userRole === 'user' && (
                    <Link href={`/favourite`}>
                      <DropdownMenuItem>
                        <UserIcon className="mr-2 h-4 w-4" />
                        <span>Избранное</span>
                      </DropdownMenuItem>
                    </Link>
                  )}
                  {userRole === 'user' && (
                    <Link href={`/lk-user`}>
                      <DropdownMenuItem>
                        <UserIcon className="mr-2 h-4 w-4" />
                        <span>Личный кабинет</span>
                      </DropdownMenuItem>
                    </Link>
                  )}
                  {userRole === 'admin' && (
                    <Link href={`/admin`}>
                      <DropdownMenuItem>
                        <SettingsIcon className="mr-2 h-4 w-4" />
                        <span>Панель администратора</span>
                      </DropdownMenuItem>
                    </Link>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    <span>Выйти</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="bg-white text-emerald-700">
                    <LogInIcon className="mr-2 h-4 w-4" />
                    Войти
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Вход в систему</DialogTitle>
                    <DialogDescription>
                      Выберите способ входа:
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col space-y-4">
                    <Button variant="outline" onClick={() => handleLogin('user')}>
                      <img src="/gosuslugi-logo.svg" alt="Госуслуги" className="mr-2 h-5 w-5" />
                      Войти через Госуслуги
                    </Button>
                    <Button variant="outline" onClick={() => handleLogin('user')}>
                      <img src="/mos-ru-logo.svg" alt="mos.ru" className="mr-2 h-5 w-5" />
                      Войти через mos.ru
                    </Button>
                    <Button variant="outline" onClick={() => handleLogin('user')}>
                      <img src="/vk-logo.svg" alt="VK ID" className="mr-2 h-5 w-5" />
                      Войти через VK ID
                    </Button>
                    <Separator />
                    <p className="text-sm text-center text-muted-foreground">Для тестирования:</p>
                    <Button onClick={() => handleLogin('user')}>Войти как пользователь</Button>
                    <Button onClick={() => handleLogin('organizer')}>Войти как организатор</Button>
                    <Button onClick={() => handleLogin('admin')}>Войти как администратор</Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <MenuIcon className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Меню</SheetTitle>
                  <SheetDescription>
                    <nav className="mt-6">
                      <ul className="space-y-4">
                        <li><a href="#about" className="text-lg text-emerald-600 hover:underline">О нас</a></li>
                        <li><a href="#events" className="text-lg text-emerald-600 hover:underline">События</a></li>
                        <li><a href="#community" className="text-lg text-emerald-600 hover:underline">Сообщество</a></li>
                        <li><a href="#resources" className="text-lg text-emerald-600 hover:underline">Ресурсы</a></li>
                      </ul>
                    </nav>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="container mx-auto mt-12 px-4">
        <section id="hero" className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 text-emerald-800">Добро пожаловать в Экопросвет</h2>
          <p className="text-2xl mb-8 text-emerald-700">Ваш путеводитель по экологическим событиям Москвы</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full text-lg">Узнать больше</Button>
            {isLoggedIn && userRole === 'organizer' && (
              <Button size="lg" variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-3 rounded-full text-lg">Создать мероприятие</Button>
            )}
          </div>
        </section>

        <section id="search" className="mb-16">
          <Card className="bg-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Input
                  placeholder="Поиск событий..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-grow text-lg"
                />
                <Select value={eventFilter} onValueChange={setEventFilter}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Тип события" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все типы</SelectItem>
                    <SelectItem value="exhibition">Выставки</SelectItem>
                    <SelectItem value="workshop">Мастер-классы</SelectItem>
                    <SelectItem value="conference">Конференции</SelectItem>
                    <SelectItem value="volunteer">Волонтерство</SelectItem>
                    <SelectItem value="lecture">Лекции</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="bg-emerald-600 hover:bg-emerald-700 w-full sm:w-auto"><SearchIcon className="mr-2" /> Найти</Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="calendar" className="mb-16">
          <h2 className="text-4xl font-bold mb-6 text-emerald-800">Календарь событий</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <Card className="bg-white shadow-xl flex-grow">
              <CardContent className="p-4">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
            <Card className="bg-white shadow-xl flex-grow">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-emerald-700">События на {date?.toLocaleDateString()}</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-72">
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="community" className="mb-16">
          <h2 className="text-4xl font-bold mb-6 text-emerald-800">Наше сообщество</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-semibold text-emerald-700">
                  <UsersIcon className="mr-2 h-6 w-6" />
                  Участники
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-emerald-600">5,000+</p>
                <p className="text-gray-600">активных участников</p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-semibold text-emerald-700">
                  <CalendarIcon className="mr-2 h-6 w-6" />
                  События
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-emerald-600">200+</p>
                <p className="text-gray-600">эко-событий в год</p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-semibold text-emerald-700">
                  <LeafIcon className="mr-2 h-6 w-6" />
                  Инициативы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-emerald-600">50+</p>
                <p className="text-gray-600">экологических инициатив</p>
              </CardContent>
            </Card>
          </div>
          <Link href={`/community`}>
            <Button variant="outline" className="mt-5 border-emerald-600 text-emerald-600 hover:bg-emerald-50">Перейти</Button>
          </Link>
        </section>

        <section id="trending" className="mb-16">
          <h2 className="text-4xl font-bold mb-6 text-emerald-800">Актуальные темы</h2>
          <Card className="bg-white shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl font-semibold text-emerald-700">
                <TrendingUpIcon className="mr-2 h-6 w-6" />
                Популярные экологические темы
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {trendingTopics.map((topic, index) => (
                  <Badge key={index} variant="secondary" className="text-lg py-2 px-4 bg-emerald-100 text-emerald-800">{topic}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="resources" className="mb-16">
          <h2 className="text-4xl font-bold mb-6 text-emerald-800">Полезные ресурсы</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-semibold text-emerald-700">
                  <BookOpenIcon className="mr-2 h-6 w-6" />
                  Образовательные материалы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Гид по раздельному сбору</li>
                  <li>Экологичный образ жизни в мегаполисе</li>
                  <li>Как снизить свой углеродный след</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href={`/knowledge`}>
                  <Button variant="outline" className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-50">Смотреть все</Button>
                </Link>
              </CardFooter>
            </Card>
            <Card className="bg-white shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-semibold text-emerald-700">
                  <UsersIcon className="mr-2 h-6 w-6" />
                  Эко лента
                </CardTitle>
              </CardHeader>
              <CardContent>

                <p>
                  Присоединяйтесь к экологическим мероприятиям в вашем городе. Вместе мы можем сделать наш мир чище и зеленее!
                </p>
              </CardContent>
              <CardFooter>
                <Link href={`/ribbon`}>
                  <Button variant="outline" className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-50">Подробнее</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </section>

        {isLoggedIn && userRole === 'admin' && (
          <section id="admin-panel" className="mb-16">
            <Button
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={handleAdminPanelOpen}
            >
              Панель администратора
            </Button>
            <Dialog open={isAdminPanelOpen} onOpenChange={setIsAdminPanelOpen}>
              <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-semibold text-emerald-700">Панель администратора</DialogTitle>
                </DialogHeader>
                <ImprovedAdminPanelComponent />
              </DialogContent>
            </Dialog>
          </section>
        )}

        <section id="newsletter" className="mb-16">
          <Card className="bg-emerald-600 text-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Подпишитесь на нашу рассылку</CardTitle>
              <CardDescription className="text-emerald-100">Получайте последние новости о экологических событиях в Москве</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col sm:flex-row w-full max-w-sm items-center space-y-2 sm:space-y-0 sm:space-x-2">
                <Input type="email" placeholder="Email" className="bg-white text-gray-800 w-full" />
                <Button type="submit" className="bg-white text-emerald-600 hover:bg-emerald-100 w-full sm:w-auto">Подписаться</Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="bg-gradient-to-r from-emerald-800 to-emerald-700 text-white p-8 mt-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Экопросвет</h3>
              <p className="text-emerald-100">Ваш путеводитель по экологическим событиям Москвы</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Контакты</h4>
              <p className="text-emerald-100">Email: info@ecoprosvet.ru</p>
              <p className="text-emerald-100">Телефон: +7 (495) 123-45-67</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Партнеры</h4>
              <p className="text-emerald-100">Департамент природопользования и охраны окружающей среды города Москвы</p>
            </div>
          </div>
          <Separator className="my-8 bg-emerald-500" />
          <p className="text-center text-emerald-100">© 2023 Экопросвет. Все права защищены.</p>
        </div>
      </footer>
    </div>
  )
}